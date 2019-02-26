FROM python:3.7-alpine

# set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

EXPOSE 8081

# set work directory
WORKDIR /usr/local/weshop-backend

# install dependencies
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql-dev libffi-dev openssl-dev libxslt-dev \
      # Pillow dependencies
      jpeg-dev \
      zlib-dev \
      freetype-dev \
      lcms2-dev \
      openjpeg-dev \
      tiff-dev \
      tk-dev \
      tcl-dev \
      harfbuzz-dev \
      fribidi-dev \
    && pip install --upgrade pip

COPY . /usr/local/weshop-backend

RUN pip install -r requirements.txt \
  && apk del build-deps

# run entrypoint.sh
ENTRYPOINT ["/usr/local/weshop-backend/entrypoint.sh"]

# run django
# python /usr/local/weshop-backend/manage.py runserver 0.0.0.0:8001
CMD gunicorn Weshop.wsgi:application --bind 0.0.0.0:8001


