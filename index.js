
const express = require('express');
const port = parseInt(process.env.PORT) || 8080;
const app = express();

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Held ${name}!`);
});

app.get('/error', (req, res)=>{
  res.status(500); 
  res.send(`Error 500`); 
})


app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
