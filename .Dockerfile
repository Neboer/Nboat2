# specify the node base image with your desired version node:<version>
FROM node:latest
COPY . /app
WORKDIR /app
RUN npm install
RUN npm install pm2 -g
CMD ["pm2-runtime", "src/main.js"]
# replace this with your application's default port
EXPOSE 2334