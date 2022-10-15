FROM node:18-alpine3.15

WORKDIR app

COPY package*.json ./

RUN npm ci

COPY ./ ./

CMD ["npm", "run", "start:dev"]