FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm prune --omit=dev

#COPY ../.env .env

# RUN npx prisma generate

EXPOSE 3000

# CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]

CMD ["node", "dist/server.js"]
