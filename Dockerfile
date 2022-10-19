FROM node:lts as dependencies

WORKDIR /client
COPY package.json yarn.lock ./
RUN yarn  

FROM node:lts as builder

WORKDIR /client
COPY . .
COPY --from=dependencies /client/node_modules ./node_modules
RUN npm install serve -g
RUN yarn build 

FROM node:lts as runner

WORKDIR /client
ENV NODE_ENV production

# COPY --from=builder /client/tsconfig.tsbuildinfo ./
# COPY --from=builder /client/vite.config.ts ./
COPY --from=builder /client/public ./public
COPY --from=builder /client/dist ./dist
COPY --from=builder /client/node_modules ./node_modules
COPY --from=builder /client/package.json ./package.json

EXPOSE 3030

CMD ["yarn", "start"]