FROM java:7
ADD auth .
ADD controllers .
ADD data .
ADD public .
ADD updater .
ADD views .

COPY .bowerrc .
COPY Dockerfile .
COPY gruntfile.js .
COPY package.json .
COPY server.js .

RUN npm install

CMD ["java", "JavaHelloWorld"]
