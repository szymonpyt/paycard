FROM node:12-slim


WORKDIR /app

COPY pack*.json ./

RUN npm install

COPY public /app/public  
COPY src /app/src
ENV imie=Adam

ENTRYPOINT ["npm","start"]
