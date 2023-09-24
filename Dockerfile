# Use an official Node.js runtime as the base image
FROM node:alpine

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json .

RUN npm install

# Bundle app source
COPY . /usr/src/app/
# Make port 8080 available to the world outside this container
EXPOSE 5001

# Define the command to run the app
CMD [ "npm","run","start" ]