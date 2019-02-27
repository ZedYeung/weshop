#!/bin/bash
# -a is equivalent to allexport
set -a
source .env
rm -rf ./backend/docker-compose.yml
envsubst < ./backend/docker-compose.yml.template > ./backend/docker-compose.yml
docker-compose -f ./backend/docker-compose.yml up --build -d
docker build -t yeungzed/weshop_frontend:latest ./frontend
docker run -d -p 8080:80 -e PORT=80 -e BACKEND=nginx:80 --name frontend_1 --network=backend_default yeungzed/weshop_frontend:latest
echo "Running"
# docker run -d -p 8080:80 -e PORT=80 -e BACKEND=api.weshop.zedyeung.com --name frontend_1 --network=backend_default yeungzed/weshop_frontend:latest