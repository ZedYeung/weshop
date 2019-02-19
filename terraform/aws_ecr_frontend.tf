resource "aws_ecr_repository" "frontend" {
  name = "frontend"
}

resource "aws_ecr_repository_policy" "frontend" {
  repository = "${aws_ecr_repository.frontend.name}"

  policy = <<EOF
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "new policy",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:BatchCheckLayerAvailability",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload",
                "ecr:DescribeRepositories",
                "ecr:GetRepositoryPolicy",
                "ecr:ListImages",
                "ecr:DeleteRepository",
                "ecr:BatchDeleteImage",
                "ecr:SetRepositoryPolicy",
                "ecr:DeleteRepositoryPolicy"
            ]
        }
    ]
}
EOF

  provisioner "local-exec" {
    command     = "export AWS_ACCESS_KEY_ID=\"${var.aws_access_key}\"; export AWS_SECRET_ACCESS_KEY=\"${var.aws_secret_key}\"; eval $(aws ecr get-login --no-include-email --region ${var.aws_region})"
    interpreter = ["bash", "-c"]
  }
}

output "frontend_repository_url" {
  value = "${aws_ecr_repository.frontend.repository_url}"
}
