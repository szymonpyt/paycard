ARG REPO=973265445380.dkr.ecr.us-east-2.amazonaws.com
FROM ${REPO}/node:12-slim


WORKDIR /app

COPY pack*.json ./

RUN npm install

COPY public /app/public  
COPY src /app/src


ENTRYPOINT ["npm","start"]
