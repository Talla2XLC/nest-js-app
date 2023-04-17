FROM node:18.3.0

WORKDIR /app

COPY package*.json ./

EXPOSE 5000
EXPOSE 9229

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]
