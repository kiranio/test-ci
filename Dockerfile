FROM node:latest

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/
RUN yarn install

RUN yarn test

RUN yarn build
