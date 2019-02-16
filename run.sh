#!/bin/bash
echo "build"
# sudo docker-compose build --no-cache
sudo docker-compose build
echo "up"
sudo docker-compose up