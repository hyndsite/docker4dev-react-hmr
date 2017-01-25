FROM beevelop/nodejs-python

MAINTAINER Max McCarty

ENV NODE_ENV=production PORT=7000

COPY . /var/app
WORKDIR /var/app

EXPOSE $PORT

RUN npm install --production
RUN npm run build:prod

CMD ["npm", "run", "start:prod", "--production"]