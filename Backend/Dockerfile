FROM node:22-alpine

RUN apk add --no-cache bind-tools

WORKDIR /app

COPY package*.json ./

RUN npm install --include=dev

COPY . .

COPY .env .env  

EXPOSE 5000

CMD ["npm", "run", "dev"]
