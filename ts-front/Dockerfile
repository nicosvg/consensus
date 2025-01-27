FROM node:lts-alpine as build

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY ./public ./public
COPY ./src ./src
COPY ./.browserslistrc ./
COPY ./.eslintrc.js ./
COPY ./babel.config.js ./
COPY ./tsconfig.json ./

# Use old unsecure version of openssl
RUN export NODE_OPTIONS=--openssl-legacy-provider
# install project dependencies
RUN npm install
# build app for production with minification
RUN NODE_OPTIONS=--openssl-legacy-provider npm run build --production

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist ./

CMD envsubst < ./environment.template.js > ./environment.js && exec nginx -g 'daemon off;'
