FROM node:18.20.0-alpine

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 5173

CMD [ "npm", "run", "dev" ]