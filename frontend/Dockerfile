# Stage 1
FROM node:10.15.1 as react-build
WORKDIR /usr/local/weshop-frontend/
COPY ./ /usr/local/weshop-frontend/
RUN yarn && yarn build

# Stage 2 - the production environment
FROM nginx:1.15.8

COPY --from=react-build /usr/local/weshop-frontend/build /usr/share/nginx/html

COPY nginx.conf.template /etc/nginx/nginx.conf.template

CMD /bin/bash -c "envsubst '\$PORT \$BACKEND' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf" && nginx -g 'daemon off;'
