data "template_file" "myapp" {
  template = "${file("${path.module}/aws_ecs_myapp_task.json")}"

  vars {
    frontend_url     = "${aws_ecr_repository.frontend.repository_url}"
    backend_url      = "${aws_ecr_repository.backend.repository_url}"
    token            = "${var.token}"
    log_group_region = "${var.aws_region}"
    log_group_name   = "${aws_cloudwatch_log_group.app.name}"
    db_password      = "${var.db_password}"
    django_secret_key = ${var.django_secret_key}
  }
}

resource "aws_ecs_task_definition" "myapp" {
  family                = "myapp_task"
  container_definitions = "${data.template_file.myapp.rendered}"

  volume {
      name = "Postgres_Data"
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
    command     = "docker-compose -f ${path.module}/../aws-docker-compose.yml build"
    interpreter = ["bash", "-c"]
  }

  provisioner "local-exec" {
    command     = "docker-compose -f ${path.module}/../aws-docker-compose.yml push"
    interpreter = ["bash", "-c"]
  }

  depends_on = [
    "aws_ecr_repository.frontend",
    "aws_ecr_repository_policy.frontend",
    "aws_ecr_repository.backend",
    "aws_ecr_repository_policy.backend",
  ]
}

resource "aws_ecs_service" "myapp" {
  name            = "myapp_ecs_service"
  cluster         = "${aws_ecs_cluster.mycluster.id}"
  task_definition = "${aws_ecs_task_definition.myapp.arn}"
  desired_count   = 1
  iam_role        = "${aws_iam_role.ecs_service.name}"

  load_balancer {
    target_group_arn = "${aws_alb_target_group.app.id}"
    container_name   = "frontend"
    container_port   = "80"
  }

  depends_on = [
    "aws_iam_role_policy.ecs_service",
    "aws_alb_listener.app_front_end",
  ]
}

output "myapp_task_revision" {
  value = "${aws_ecs_task_definition.myapp.revision}"
}

# output "myapp_task_status" {
#   value = "${aws_ecs_task_definition.myapp.status}"
# }

output "myapp_service_desired_count" {
  value = "${aws_ecs_service.myapp.desired_count}"
}
