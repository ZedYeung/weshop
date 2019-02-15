#!/bin/bash
PORT=8080
echo "build..."
sudo docker build -t weshop-frontend:1 .
echo "run..."
sudo docker run -it --rm -e "PORT=${PORT}" -p ${PORT}:${PORT} weshop-frontend:1