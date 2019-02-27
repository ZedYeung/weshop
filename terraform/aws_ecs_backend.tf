data "template_file" "backend" {
  template = "${file("${path.module}/aws_ecs_task_backend.json")}"

  vars {
    SECRET_KEY                       = "${var.SECRET_KEY}"
    SQL_ENGINE                       = "${var.SQL_ENGINE}"
    SQL_DATABASE                     = "${var.SQL_DATABASE}"
    SQL_USER                         = "${var.SQL_USER}"
    SQL_PASSWORD                     = "${var.SQL_PASSWORD}"
    SQL_HOST                         = "${var.SQL_HOST}"
    SQL_PORT                         = "${var.SQL_PORT}"
    DATABASE                         = "${var.DATABASE}"
    REDIS_PASSWORD                   = "${var.REDIS_PASSWORD}"
    SOCIAL_AUTH_AMAZON_KEY           = "${var.SOCIAL_AUTH_AMAZON_KEY}"
    SOCIAL_AUTH_AMAZON_SECRET        = "${var.SOCIAL_AUTH_AMAZON_SECRET}"
    SOCIAL_AUTH_GOOGLE_OAUTH2_KEY    = "${var.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY}"
    SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = "${var.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET}"
    SOCIAL_AUTH_TWITTER_KEY          = "${var.SOCIAL_AUTH_TWITTER_KEY}"
    SOCIAL_AUTH_TWITTER_SECRET       = "${var.SOCIAL_AUTH_TWITTER_SECRET}"
    STRIPE_PUBLISHABLE_KEY           = "${var.STRIPE_PUBLISHABLE_KEY}"
    STRIPE_SECRET_KEY                = "${var.STRIPE_SECRET_KEY}"
    APP                              = "${var.APP}"
    FRONTEND                         = "${var.FRONTEND}"
    BACKEND                          = "${var.BACKEND}"
    PORT                             = "${var.PORT}"
    DOCKERHUB_USER                   = "${var.DOCKERHUB_USER}"
    aws_alb                          = "${aws_alb.alb-ecs-backend.dns_name}"
    log_group_region                 = "${var.aws_region}"
    log_group_name                   = "${aws_cloudwatch_log_group.app.name}"
  }
}

resource "aws_ecs_task_definition" "backend" {
  family                = "backend"
  container_definitions = "${data.template_file.backend.rendered}"

  volume {
    name = "Postgres_Data"

    docker_volume_configuration {
      scope         = "shared"
      autoprovision = true
      driver        = "local"
    }
  }

  volume {
    name = "Static_Volume"

    docker_volume_configuration {
      scope         = "shared"
      autoprovision = true
      driver        = "local"
    }
  }

  volume {
    name = "Media_Volume"

    docker_volume_configuration {
      scope         = "shared"
      autoprovision = true
      driver        = "local"
    }
  }

  provisioner "local-exec" {
    command     = "rm -rf ${path.module}/../backend/docker-compose.yml"
    interpreter = ["bash", "-c"]
  }

  provisioner "local-exec" {
    command     = "envsubst < ${path.module}/../backend/docker-compose.yml.template > ${path.module}/../backend/docker-compose.yml"
    interpreter = ["bash", "-c"]
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
    "aws_alb_listener.backend_https",
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
