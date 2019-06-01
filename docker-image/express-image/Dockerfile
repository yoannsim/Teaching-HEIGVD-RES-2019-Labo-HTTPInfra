FROM node:4.4

RUN printf "deb http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debian.org jessie/updates main" > /etc/apt/sources.list
RUN apt-get update && apt-get install -y vim

COPY src /opt/app


RUN npm install --save chance
RUN npm install --save express

CMD ["node", "/opt/app/index.js"]