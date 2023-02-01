FROM node:19

EXPOSE 3335

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npx prisma generate

COPY . .

CMD [ "npm", "run", "dev"]