FROM node

ADD . ./src
RUN cd /src; npm install

CMD ["node", "server.js"]
