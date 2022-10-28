FROM node:16-alpine

ENV NODE_ENV production
ENV PORT 80
WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT npm start