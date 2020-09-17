const express=require('express');
const app = express();
const port = process.env.port || 3000;
const customerRouter=require('./router')

app.use(express.json())
app.use('/customers', customerRouter)
app.listen(port , ()=>{
    console.log(`connect the application on ${port}`);
})
