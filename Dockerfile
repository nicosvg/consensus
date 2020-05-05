FROM node:alpine

WORKDIR /usr/src/app

COPY ./ts-back/package*.json ./
COPY ./ts-back/tsconfig*.json ./
RUN npm ci --quiet
COPY ./ts-back/src ./src
RUN npm run build

ENV PORT 8000
ENTRYPOINT [ "node", "dist/index.js" ]
