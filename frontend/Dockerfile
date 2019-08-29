# base image
FROM node:12.2.0-alpine

# Port Application listens on
EXPOSE 3001
EXPOSE 35729

# Copy app and install packages
WORKDIR /app
COPY . /app
RUN npm install react-scripts@3.0.1 -g --silence
RUN npm install --silence

# start app
ENTRYPOINT ["npm"]
CMD ["run", "start"]