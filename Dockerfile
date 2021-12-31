FROM node:12-alpine
RUN apk add g++ make python 

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN yarn install
RUN yarn build
RUN yarn generate

ENV HOST 0.0.0.0
EXPOSE 3030

# start command
CMD [ "yarn", "start" ]