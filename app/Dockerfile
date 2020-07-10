FROM node:current-alpine
RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm install -g @angular/cli
EXPOSE 4200
CMD ["ng", "serve"]
