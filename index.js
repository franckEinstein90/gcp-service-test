
const express = require('express');
const path = require('path'); 

const port = parseInt(process.env.PORT) || 8080;
const app = express();


const APICan = {    //this is the app
  faviconPath     : __dirname + '/public/LOGO139x139.png', 
  process         : {
      id : process.pid
  },  
  root            : __dirname, 
  settingsDB      : 'settings.db', 
  stats           : {}, 
  staticFolder    : path.join(__dirname, 'public'),
  expressStack    : app  
}

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Held ${name}!`);
});

app.get('/todd', (req, res)=>{
  res.send("Hi todd"); 
}); 


app.get('/error', (req, res)=>{
  res.status(500); 
  res.send(`Error 500`); 
}); 


app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
