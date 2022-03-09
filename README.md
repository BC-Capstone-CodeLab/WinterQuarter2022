# Project Name: CODELAB

**To run a local demo:**
* Create a local server
* Compile the js with webpack

---
**First Step**
```javascript
/** Install all the project dependencies with node. */
npm install
```
...

**Second Step**
```javascript
/** Compile the code with webpack. */
node_modules/.bin/webpack //This will read the webpack.config.js file
```
...

**Third Step**
```javascript
//Create a file called server.js
//Add the following lines of code

const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('.'));

app.listen(port, ()=> {
    console.log(`Server Listening on Port ${port}`);
});
```
...

**Fifth Step**
```javascript
/** You can choose any port number so long it is available. */
PORT=4000 node server.js
```
**Finally**
Open your browser and go to **http://localhost:4000**.

