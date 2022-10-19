FROM node:lts as dependencies

WORKDIR /client
COPY package.json yarn.lock ./
RUN yarn  

FROM node:lts as builder

WORKDIR /client
COPY . /client
COPY --from=dependencies /client/node_modules ./node_modules
RUN yarn build 
