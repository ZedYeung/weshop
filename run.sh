#!/bin/bash
# echo "build"
# # sudo docker-compose build --no-cache
# sudo docker-compose build
# echo "up"
# sudo docker-compose up
docker-compose -f ./backend/docker-compose.yml up --build -d
docker build -t yeungzed/weshop_frontend:latest --no-cache ./frontend
# docker run -d -p 8080:80 -e PORT=80 -e BACKEND=nginx:80 --name frontend_1 --network=backend_default yeungzed/weshop_frontend:latest
docker run -d -p 8080:80 -e PORT=80 -e BACKEND=api.weshop.zedyeung.com --name frontend_1 --network=backend_default yeungzed/weshop_frontend:latest