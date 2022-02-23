
import express from 'express';
import { engine } from 'express-handlebars'; 
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import {cpuUsage, cpuCount, freemem, totalmem, freememPercentage}  from 'os-utils'; 
import {viewSystem} from "./src/viewSystem.js"; 

const __filename = fileURLToPath(import.meta.url); 
const rootPath = path.dirname(__filename); 

const port = parseInt(process.env.PORT) || 8080;
const app = express();
const memoryStore = [];

viewSystem({app, rootPath}); 


app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.render('home', {layout: false});
});


app.get('/addMem', (req, res)=>{
  for(let i=0; i<100; i++) {
    memoryStore.push('Adding memory'); 
  }
  res.send(memoryStore.length); 
}); 

app.get('/memoryUsage', (req, res)=>{
  const currentMemoryUsage = freemem();
  const currentFreeMemory = freemem();
  const totalMemory = totalmem(); 

  const memInfo = [
    `Total: ${totalMemory}`, 
    `Free: ${currentFreeMemory}`,
    `=${freememPercentage()}%`

  ]; 
  const used = process.memoryUsage();
  for (let key in used) {
    memInfo.push((`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`)); 
  }

  memInfo.push(`<hr/> Memory array current allocation: ${memoryStore.length}`)

  /*  const cpus = os.cpus().map(c => c.times.user).join('<br/>'); 
  str.push(`<h1>cpus</h1>:${cpus}<br/>`); */
  res.send(memInfo.join('<BR/>')); 
})

app.get('/cpu', (req, res)=>{
  const cpuNum = `This backend is using ${cpuCount()} cpus`;  
  res.send(cpuNum); 
})

app.get('/ok220', (req, res) => {
  res.status(220); 
  res.send(`Ok 220`);
});

app.get('/error400', (req, res)=>{
  //generates a random 5xx error between 400 and 418 included
  let errorCode = Math.floor(Math.random() * 18).toString(); 
  errorCode = errorCode.length === 1 ? '40' + errorCode : '4' + errorCode; 
  res.status(errorCode); 
  res.send(`Created error ${errorCode}`); 
}); 


app.get('/error500', (req, res)=>{
  //generates a random 5xx error between 500 and 511 included
  let errorCode = Math.floor(Math.random() * 12).toString(); 
  if (errorCode.length === 1) 
    {
      errorCode = '50' + errorCode; 
    }
  else {
    errorCode = '5' + errorCode; 
  }
  res.status(+errorCode); 
  res.send(`Created error ${errorCode}`); 
}); 


app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
