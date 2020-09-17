// this is full CRUD Api of course

const express=require('express');
const router = require('./router.js');
const app= express();

const port = process.env.port || 3000;
app.use(express.json());
app.use('/course',router);

app.listen(port, ()=>console.log(` Appliction listion on ${port}`))

