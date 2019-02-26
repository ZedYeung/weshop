resource "aws_security_group" "lb_sg" {
  description = "access to the application ELB"

  vpc_id = "${aws_vpc.myvpc.id}"
  name   = "app-lb-sg"

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }


  # HTTPS access from anywhere
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"

    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }
}

resource "aws_security_group" "instance_sg" {
  description = "direct access to ecs instances"
  vpc_id      = "${aws_vpc.myvpc.id}"
  name        = "ecs-instances-sg"

  ingress {
    protocol  = "tcp"
    from_port = 22
    to_port   = 22

    cidr_blocks = [
      "${var.admin_cidr}",
    ]
  }

  ingress {
    protocol  = "tcp"
    from_port = 8080
    to_port   = 8080

    security_groups = [
      "${aws_security_group.lb_sg.id}",
    ]
  }

  ingress {
    protocol  = "tcp"
    from_port = 8081
    to_port   = 8081

    security_groups = [
      "${aws_security_group.lb_sg.id}",
    ]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "asg_instance_security_group" {
  value = "${aws_security_group.instance_sg.id}"
}
