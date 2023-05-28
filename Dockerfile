
FROM node:12-alpine
WORKDIR /app
COPY package*.json /app/
COPY ./ /app/


RUN npm install
RUN npm run build


EXPOSE 3000
