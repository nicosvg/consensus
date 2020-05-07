FROM node:lts-alpine as build

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# install project dependencies
RUN npm install
# build app for production with minification
RUN npm run build --production

FROM node:lts-alpine
WORKDIR /app

# install simple http server for serving static content
RUN npm install -g http-server
# install envsub for environment variable substitution
RUN npm install -g envsub

COPY --from=build /app/dist ./dist

COPY start.sh ./
RUN chmod +x ./start.sh

EXPOSE 8080
CMD [ "./start.sh" ]
