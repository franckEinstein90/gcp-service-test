
import express from 'express';
import { engine } from 'express-handlebars'; 
import path from 'path';
import os from 'os'; 

const port = parseInt(process.env.PORT) || 8080;
const app = express();

app.engine('handlebars', engine()); 
app.set('view engine', 'handlebars');
app.set('views', './views');



app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.render('home', {layout: false});
});


app.get('/cpu', (req, res)=>{
  const cpus = os.cpus().map(c => c.times.user).join('<br/>'); 
  res.send(`<h1>cpus</h1>:${cpus}<br/>`); 
})

app.get('/ok220', (req, res) => {
  res.status(220); 
  res.send(`Ok 220`);
});

app.get('/error400', (req, res)=>{
  res.status(400); 
  res.send("Error 400"); 
}); 


app.get('/error500', (req, res)=>{
  res.status(500); 
  res.send(`Error 500`); 
}); 


app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
