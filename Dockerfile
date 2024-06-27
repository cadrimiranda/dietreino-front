FROM node:22-slim

RUN mkdir -p /app

WORKDIR /app

ENV PYTHONPATH=${PYTHONPATH}:${PWD}
ENV PORT 5173

COPY package*.json ./
COPY ./.env.production ./

RUN npm install -g serve
RUN npm install

COPY . .

RUN npm run build
EXPOSE 5173
CMD ["npx", "serve", "-s", "-l", "5173", "./dist"]