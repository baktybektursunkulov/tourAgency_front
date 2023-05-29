
FROM node:12-alpine
WORKDIR /app
COPY package*.json /app/
COPY ./ /app/


RUN npm install
RUN npm run build


EXPOSE 3000


# start app
CMD ["npm", "start"]

#docker build -t react-app .
#docker run -it -p 3000:3000 -d react-app
