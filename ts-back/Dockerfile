FROM node:alpine

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./tsconfig*.json ./
RUN npm ci --quiet
COPY ./src ./src
RUN npm run build

ENV PORT 8000
ENV DB_PATH db.json
ENTRYPOINT [ "node", "dist/index.js" ]
