resource "aws_alb_target_group" "frontend" {
  name     = "ecs-frontend"
  port     = 80
  protocol = "HTTP"
  vpc_id   = "${aws_vpc.myvpc.id}"

  health_check = {
    path    = "/health"
    matcher = 200
  }
}

resource "aws_alb" "alb-ecs-frontend" {
  name            = "alb-ecs-frontend"
  subnets         = ["${aws_subnet.mysubnet.*.id}"]
  security_groups = ["${aws_security_group.lb_sg.id}"]
}

resource "aws_alb_listener" "frontend" {
  load_balancer_arn = "${aws_alb.alb-ecs-frontend.id}"
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_alb_listener" "frontend_https" {
  load_balancer_arn = "${aws_alb.alb-ecs-frontend.id}"
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "${aws_iam_server_certificate.cert.arn}"

  default_action {
    target_group_arn = "${aws_alb_target_group.frontend.id}"
    type             = "forward"
  }
}

output "alb_frontend_hostname" {
  value = "${aws_alb.alb-ecs-frontend.dns_name}"
}
