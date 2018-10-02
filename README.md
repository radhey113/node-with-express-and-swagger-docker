# Run Node JS Back-End with Dockerfile [ Express Framework and Swagger Documentation ]

This is a boiler plate for developing a nodejs application with express. I have used `Node 8+` and `MongoDB 3.6` to create it. I have also implemented `JWT` for token verification, I have created some middlewares or helpers for user authentication.

For API documentation I have used `Swagger`.

## Requirment
 `Mongodb 3.6`:
+ **Install MonngDB 3.6**
+ *` Ref: `* https://docs.mongodb.com/manual/installation/

`NodeJS v8+`
+ *`Ref:`* http://nodejs.org

## Run Locally with Node
+ Go to project working directory / Project folder
+ Execute command   `npm install`
+ After that Run Command `node server.js`
+ Open `http://localhost:4000` to check that your server is running or not.
+ To check the documentation Kindly follow the: `http://localhost:4000/swagger`


## Run Project with Dockerfile
+ Install Docker
  + `https://docs.docker.com/install/`
  + [Run Docker image](https://medium.com/@radheyg11/docker-with-node-e6cf77cfd21f)
+ Go to terminal, Run command
  + `cd <Project directory path>`
+ Run command to create node project build
  + `docker build -t node:8 ./`
+ To Run node server (Local 4000 port mapping node server 4000 port from container)
  + `docker run -p 4000:4000 node:8`
+ To Run node server in deamon mode use command `<Parameter -d>`
  + `docker run -p 4000:4000 -d node:8`
+ Open `http://localhost:4000` to check that your server is running or not.
+ To check the documentation Kindly follow the: `http://localhost:4000/swagger`


##### Set environment variable through `<docker run>`
- Create and .env file in your project directory
- Write enviornment variable like: `NODE_ENV=development`
- Use `--env-file ./env` parameter with `docker run` command
  - Example: `docker run --env-file ./env -p 4000:4000 node:8`


## Environment Vairable
+ To set the `environment`variable for your project, you can use `./environment/development.yml` or for development or `./environment/production.yml` for production environment.
+ You can also set the environment using shell command:
  + `export env=development`
+ To check that `environment` variable is set or not:
  + `echo ${env}`

*I hope it will help you to create your new nodejs project with express using swagger api documentation.* <br /><br />
## Thank you
