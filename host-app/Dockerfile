# host-app Dockerfile

FROM node:20-alpine

WORKDIR /app

ARG VITE_MODE
ARG VITE_URL
ARG VITE_URL_SOCKET

ENV VITE_MODE=${VITE_MODE}
ENV VITE_URL=${VITE_URL}
ENV VITE_URL_SOCKET=${VITE_URL_SOCKET}

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "serve"]
