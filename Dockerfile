FROM node:20.11.1-alpine3.18 as build
WORKDIR /usr/local/app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .

RUN npm run build --production


FROM node:20.11.1-alpine3.18 as prod
WORKDIR /usr/local/app

COPY --from=build /usr/local/app/build .

CMD ["npm", "start"]