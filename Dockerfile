FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
EXPOSE 8000
CMD [ "npm" , "start" ]