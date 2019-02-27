resource "aws_alb_target_group" "backend" {
  name     = "ecs-backend"
  port     = 80
  protocol = "HTTP"
  vpc_id   = "${aws_vpc.myvpc.id}"

  health_check = {
    path    = "/health"
    matcher = 200
  }
}

resource "aws_alb" "alb-ecs-backend" {
  name            = "alb-ecs-backend"
  subnets         = ["${aws_subnet.mysubnet.*.id}"]
  security_groups = ["${aws_security_group.lb_sg.id}"]
}

resource "aws_alb_listener" "backend" {
  load_balancer_arn = "${aws_alb.alb-ecs-backend.id}"
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

resource "aws_alb_listener" "backend_https" {
  load_balancer_arn = "${aws_alb.alb-ecs-backend.id}"
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "${aws_iam_server_certificate.cert.arn}"

  default_action {
    target_group_arn = "${aws_alb_target_group.backend.id}"
    type             = "forward"
  }
}

output "alb_backend_hostname" {
  value = "${aws_alb.alb-ecs-backend.dns_name}"
}
