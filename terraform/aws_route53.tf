resource "aws_route53_record" "frontend" {
  zone_id = "${var.route53_zone_id}"
  name    = "${var.frontend_domain}"
  type    = "A"

  alias {
    name                   = "${aws_alb.alb-ecs-frontend.dns_name}"
    zone_id                = "${aws_alb.alb-ecs-frontend.zone_id}"
    evaluate_target_health = true
  }

  depends_on = [
    "aws_alb.alb-ecs-frontend",
  ]
}

resource "aws_route53_record" "backend" {
  zone_id = "${var.route53_zone_id}"
  name    = "${var.backend_domain}"
  type    = "A"

  alias {
    name                   = "${aws_alb.alb-ecs-backend.dns_name}"
    zone_id                = "${aws_alb.alb-ecs-backend.zone_id}"
    evaluate_target_health = true
  }

  depends_on = [
    "aws_alb.alb-ecs-backend",
  ]
}