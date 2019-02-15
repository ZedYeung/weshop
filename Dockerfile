# Stage 1
FROM node:9.6.1 as react-build
WORKDIR /usr/local/weshop-frontend/
COPY ./ /usr/local/weshop-frontend/
RUN yarn && yarn build

# Stage 2 - the production environment
FROM nginx:1.15.8

COPY --from=react-build /usr/local/weshop-frontend/build /usr/share/nginx/html

COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
