FROM node:lts-alpine as build

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./tsconfig*.json ./
RUN npm ci --quiet
COPY ./src ./src
RUN npm run build
RUN npm ci --quiet --production

FROM node:lts-alpine
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

ENV PORT 8000
ENV DB_PATH db.json
ENTRYPOINT [ "node", "dist/index.js" ]
