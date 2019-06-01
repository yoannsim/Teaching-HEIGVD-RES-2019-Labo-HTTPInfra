FROM node:4.4

RUN apt-get update && apt-get install -y vim

COPY src /opt/app


RUN npm install --save chance
RUN npm install --save express

CMD ["node", "/opt/app/index.js"]