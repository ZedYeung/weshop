data "template_file" "frontend" {
  template = "${file("${path.module}/aws_ecs_task_frontend.json")}"

  vars {
    app              = "${var.app}"
    dockerhub_user   = "${var.dockerhub_user}"
    backend_domain   = "${var.backend_domain}"
    log_group_region = "${var.aws_region}"
    log_group_name   = "${aws_cloudwatch_log_group.app.name}"
  }
}

resource "aws_ecs_task_definition" "frontend" {
  family                = "${var.app}"
  container_definitions = "${data.template_file.frontend.rendered}"

  provisioner "local-exec" {
    command     = "docker build -t ${var.dockerhub_user}/${var.app}_frontend:latest ../frontend"
    interpreter = ["bash", "-c"]
  }

  provisioner "local-exec" {
    command     = "docker push ${var.dockerhub_user}/${var.app}_frontend:latest"
    interpreter = ["bash", "-c"]
  }
}

resource "aws_ecs_service" "frontend" {
  name            = "frontend_ecs_service"
  cluster         = "${aws_ecs_cluster.mycluster.id}"
  task_definition = "${aws_ecs_task_definition.frontend.arn}"
  desired_count   = 1
  iam_role        = "${aws_iam_role.ecs_service.name}"

  load_balancer {
    target_group_arn = "${aws_alb_target_group.frontend.id}"
    container_name   = "frontend"
    container_port   = "80"
  }

  depends_on = [
    "aws_iam_role_policy.ecs_service",
    "aws_alb_listener.frontend",
    "aws_alb_listener.frontend_https"
  ]
}

output "frontend_task_revision" {
  value = "${aws_ecs_task_definition.frontend.revision}"
}

# output "frontend_task_status" {
#   value = "${aws_ecs_task_definition.frontend.status}"
# }

output "frontend_service_desired_count" {
  value = "${aws_ecs_service.frontend.desired_count}"
}
