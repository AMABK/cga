# base image
FROM node:lts-alpine


# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install --only=dev 
RUN npm install -g @angular/cli

# add app
COPY . /app
EXPOSE 4200
# start app
CMD ng serve --host 0.0.0.0 --port 4200
