FROM nginx:1.20

WORKDIR /var/www/public

RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
