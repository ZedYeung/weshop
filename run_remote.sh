#!/bin/bash
# -a is equivalent to allexport
set -a
source .env
rm -rf ./terraform/vars.tf
envsubst < ./terraform/vars.tf.template > ./terraform/vars.tf
terraform init ./terraform
terraform apply ./terraform
echo "Done"