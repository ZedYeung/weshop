#!/bin/bash
terraform destroy ./terraform
rm -rf ./terraform/vars.tf
echo "Done"