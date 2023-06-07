FROM node:20

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli npm pnpm

COPY package*.json ./

RUN pnpm i

COPY . .

EXPOSE 3000

CMD ["pnpm", "start:debug"]
