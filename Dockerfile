# specify the node base image with your desired version node:<version>
FROM node:latest
COPY . /app
WORKDIR /app
RUN npm config set registry https://registry.npm.taobao.org \
    && npm install -g pm2 yarn \
    && yarn config set registry https://registry.npm.taobao.org/ \
    && yarn
CMD ["pm2-runtime", "src/main.js"]
# replace this with your application's default port
EXPOSE 2334
