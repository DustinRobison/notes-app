# Welcome To Notes-App

This is a **very simple** app to allow users to Create, Read, Update and Destroy notes! This is a personal project for learning purposes only.

Please **do not use this for anything important** as the database volatile, meaning it is in memory and it will be wiped on app termination. Also, this app was largely for learning purposes so it has security issues and development environment settings.

#### What it does:
1. Provides a user interface at `http://server/` the base server url with express to serve a page that hosts a [React component](https://reactjs.org/docs/add-react-to-a-website.html)
2. Provides a user interface at `http://server/api` with interactive UI documentation via swagger (https://swagger.io/tools/swagger-ui/).
3. Provides web services [via swagger](https://github.com/swagger-api/swagger-node)
    1. Note: this library is outdated.


#### Requirements to Run:
1. Install [Node](https://nodejs.org/en/download/)

### Instructions to run in a unix shell:
> After downloading the project from git and changing directories into the project
1. Install dependencies `npm install`
2. Run the app `npm start`
    1. By default the app runs on port 10010 but you can change that by exporting the variable PORT to a number of your choosing
    

### Known Issues:
1. Security Alerts, dependencies need to be updated.
2. Client: Left sidebar text does not update on save.


### Large TODO's:
1. Resolve known issues
2. Client: Fix styling with the help of a styling library like [material ui](https://material-ui.com/)
3. Client: Create a solution for nested object updates to sub components, likely using [Redux](https://redux.js.org/)
4. Client: Create tests for the UI with [Jest](https://jestjs.io/docs/en/tutorial-react)
5. Client: Change the note editor to use a debouncer and events that doesnt require the user to press save to persist and update.
6. Server: Separate the DB out of memory so it is no longer voltile.
7. Client: Seperate the UI code into its own React App project to take advantage of Ease of Use tools like [react router](https://github.com/ReactTraining/react-router) etc.
8. Server: Review current middleware tools to find a better solution than swagger.