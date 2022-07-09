FROM node:16.13.1-alpine

WORKDIR /var/www/

COPY client/ /var/www/
RUN npm install

CMD ["npm", "run", "dev"]
