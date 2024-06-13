FROM node:latest

WORKDIR /htql

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD npm run start:dev