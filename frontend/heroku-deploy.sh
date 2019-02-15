#!/bin/bash
sudo docker build -t registry.heroku.com/weshop-demo/web .
sudo docker push registry.heroku.com/weshop-demo/web
heroku container:release web -a weshop-demo