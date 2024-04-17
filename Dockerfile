FROM node:20.11.1-alpine3.18 as build
WORKDIR /usr/local/app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
COPY . .

RUN npm run build


FROM node:20.11.1-alpine3.18 as prod
WORKDIR /usr/local/app

COPY ./package.json .
COPY ./package-lock.json .
COPY ./.env .

RUN npm ci --omit=dev

COPY --from=build /usr/local/app/build .

CMD ["npm", "start"]