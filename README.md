# Node JS Back-End with Express Framework and Swagger Documentation

This is a boiler plate for developing a nodejs application with express. I have used `Node 8+` and `MongoDB 3.6` to create it. I have also implemented `JWT` for token verification, I have created some middlewares or helpers for user authentication.

For API documentation I have used `Swagger`.

## Requirment
 `Mongodb 3.6`:
+ **Install MonngDB 3.6**
+ *` Ref: `* https://docs.mongodb.com/manual/installation/

`NodeJS v8+`
+ *`Ref:`* http://node.org
## Run
+ Go to project folder and run npm install
+ Run Command    `npm install`
+ Then Run Command `node server.js`
+ Open `http://localhost:4000` to check that your server is running or not.
+ To check the documentation Kindly follow the: `http://localhost:4000/swagger`

## Environment Vairable
+ To set the `environment`variable you can use `./environment/development.yml` or for development or `./environment/production.yml` for production environment.
+ You can also set the environment using shell command:
    `- export env=development`
+ To check that `environment` variable is set or not:
   `- echo ${env}`

*I hope it will help you to create your new nodejs project with express using swagger api documentation.*
## Thank you