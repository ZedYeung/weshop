#!/bin/bash

# generate requirement.txt
# pipreqs .
python manage.py dumpdata --natural-foreign \
   --exclude auth.permission --exclude contenttypes \
   --indent 4 > data.json