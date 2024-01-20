
Hello Pooja here...! 
  I am attaching POSTMAN API collection (json file) with project files.
  
Technologies Used -> 
1. Using MVC architecture for code seperation (DB config -> routes -> services -> repository -> model)
2. Express js framework to fastify the NodeJS App 
3. Typescript to provide type safety
4. Mongo DB as database
5. JWT for Authentication purpose using bcrypt library
6. Providing service types for providing typesafety for every created object

How to use:

Import the Postman APIs json in Postman Application

As I am following MVC architecutre for creating a backend APP, there are various layers & No any API is allowed to access without sending jwt token in authorization header. So token is created at the time of user registeration

1. User Registration -> 
User will register himself, so that token will be generated and also will be store in database with encrpted password.

2. User Login -> User need to put his email & password compulsory at the time of login, as it is necessary to verify the newly created token (with mail & password) with existing token.

3. User Services -> After successfull authentication user can hit any routes

4. Site Creation & handle site API's

5. Category Creation & handle Category API's

6. Mission Creation & handle Mission API's

7. Drones Creation & handle Drones API's

Let me know your feedback, if have any issues while serving any API you can contact me on the same mail id.




