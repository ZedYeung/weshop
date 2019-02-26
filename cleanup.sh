#!/bin/bash
docker rm -f frontend_1
docker-compose -f ./backend/docker-compose.yml down -v