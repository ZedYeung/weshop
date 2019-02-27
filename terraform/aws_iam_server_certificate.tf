resource "aws_iam_server_certificate" "cert" {
  name_prefix = "cert"

  private_key       = "${file("${path.module}/../../acme/certificate_pem/${var.DOMAIN}_private_key.pem")}"
  certificate_body  = "${file("${path.module}/../../acme/certificate_pem/${var.DOMAIN}.pem")}"
  certificate_chain = "${file("${path.module}/../../acme/certificate_pem/${var.DOMAIN}_issuer.pem")}"

  lifecycle {
    create_before_destroy = true
  }

  provisioner "local-exec" {
    command = "sleep 10"
  }
}