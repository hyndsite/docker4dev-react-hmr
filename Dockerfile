FROM mhart/alpine-node:6.9.2

MAINTAINER Max McCarty

ENV NODE_ENV=production PORT=7000

COPY . /var/www
WORKDIR /var/www

EXPOSE $PORT

RUN apk add --no-cache make gcc g++ python
RUN npm install --production
RUN npm run build:prod

CMD ["npm", "run", "start:prod", "--production"]