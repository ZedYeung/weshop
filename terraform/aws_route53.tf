resource "aws_route53_record" "app" {
  zone_id = "${var.route53_zone_id}"
  name    = "${var.app_domain}"
  type    = "A"

  alias {
    name                   = "${aws_alb.alb-ecs-app.dns_name}"
    zone_id                = "${aws_alb.alb-ecs-app.zone_id}"
    evaluate_target_health = true
  }

  depends_on = [
    "aws_alb.alb-ecs-app",
  ]
}