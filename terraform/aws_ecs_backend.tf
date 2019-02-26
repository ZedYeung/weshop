data "template_file" "backend" {
  template = "${file("${path.module}/aws_ecs_task_backend.json")}"

  vars {
    app              = "${var.app}"
    dockerhub_user   = "${var.dockerhub_user}"
    db_password      = "${var.db_password}"
    django_secret_key = "${var.django_secret_key}"
    frontend_domain  = "${var.frontend_domain}"
    backend_domain   = "${var.backend_domain}"
    aws_alb          = "${aws_alb.alb-ecs-backend.dns_name}"
    log_group_region = "${var.aws_region}"
    log_group_name   = "${aws_cloudwatch_log_group.app.name}"
  }
}

resource "aws_ecs_task_definition" "backend" {
  family                = "${var.app}"
  container_definitions = "${data.template_file.backend.rendered}"

  volume {
      name = "Postgres_Data"
      docker_volume_configuration {
          scope = "shared"
          autoprovision = true
          driver = "local"
      }
  }

  volume {
      name = "Static_Volume"
      docker_volume_configuration {
          scope = "shared"
          autoprovision = true
          driver = "local"
      }
  }

  volume {
      name = "Media_Volume"
      docker_volume_configuration {
          scope = "shared"
          autoprovision = true
          driver = "local"
      }
  }

  provisioner "local-exec" {
    command     = "docker-compose -f ${path.module}/../backend/docker-compose.yml build"
    interpreter = ["bash", "-c"]
  }

  provisioner "local-exec" {
    command     = "docker-compose -f ${path.module}/../backend/docker-compose.yml push"
    interpreter = ["bash", "-c"]
  }
}

resource "aws_ecs_service" "backend" {
  name            = "backend_ecs_service"
  cluster         = "${aws_ecs_cluster.mycluster.id}"
  task_definition = "${aws_ecs_task_definition.backend.arn}"
  desired_count   = 1
  iam_role        = "${aws_iam_role.ecs_service.name}"

  load_balancer {
    target_group_arn = "${aws_alb_target_group.backend.id}"
    container_name   = "nginx"
    container_port   = "80"
  }

  depends_on = [
    "aws_iam_role_policy.ecs_service",
    "aws_alb_listener.backend",
    "aws_alb_listener.backend_https"
  ]
}

output "backend_task_revision" {
  value = "${aws_ecs_task_definition.backend.revision}"
}

# output "backend_task_status" {
#   value = "${aws_ecs_task_definition.backend.status}"
# }

output "backend_service_desired_count" {
  value = "${aws_ecs_service.backend.desired_count}"
}
