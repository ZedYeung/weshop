resource "aws_ecs_task_definition" "myapp" {
  family                = "myapp_task"
  container_definitions = "${file("aws_ecs_task_definition.json")}"

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
