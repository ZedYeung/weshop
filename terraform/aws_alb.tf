resource "aws_alb_target_group" "app" {
  name     = "ecs-app"
  port     = 80
  protocol = "HTTP"
  vpc_id   = "${aws_vpc.myvpc.id}"

  health_check = {
    path    = "/health"
    matcher = 200
  }
}

resource "aws_iam_server_certificate" "cert" {
  name_prefix = "cert"

  private_key       = "${file("${path.module}/../../acme/certificate_pem/${var.domain}_private_key.pem")}"
  certificate_body  = "${file("${path.module}/../../acme/certificate_pem/${var.domain}.pem")}"
  certificate_chain = "${file("${path.module}/../../acme/certificate_pem/${var.domain}_issuer.pem")}"

  lifecycle {
    create_before_destroy = true
  }

  provisioner "local-exec" {
    command = "sleep 10"
  }
}

resource "aws_alb" "alb-ecs-app" {
  name            = "alb-ecs-app"
  subnets         = ["${aws_subnet.mysubnet.*.id}"]
  security_groups = ["${aws_security_group.lb_sg.id}"]
}

resource "aws_alb_listener" "app_front_end" {
  load_balancer_arn = "${aws_alb.alb-ecs-app.id}"
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

resource "aws_alb_listener" "app_front_end_https" {
  load_balancer_arn = "${aws_alb.alb-ecs-app.id}"
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "${aws_iam_server_certificate.cert.arn}"

  default_action {
    target_group_arn = "${aws_alb_target_group.app.id}"
    type             = "forward"
  }
}

output "alb_hostname" {
  value = "${aws_alb.alb-ecs-app.dns_name}"
}
