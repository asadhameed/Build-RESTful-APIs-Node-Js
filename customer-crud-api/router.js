const express = require('express');
const { required } = require('joi');
const Joi = require('joi');
const router = express.Router();
const joi = express('joi')
const Customer = require('./database')
router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers)
})

router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    let customer;
    try {
        customer = await Customer.find({ _id })
    } catch (error) {
        return res.send(error.message)
    }
    if (!customer) {
        return res.send(`customer with  id=${_id} is not found `)
    }
    res.send(customer)
})

 function validation(customer) {
    const schema = Joi.object({
        name:Joi.string()
        .min(4)
        .max(20)
        .required(),
        phone:Joi.string()
        .pattern( new RegExp(/^\d{3}-\d{3}$/))
        .message('Enter the valid phone number :->valid formate is 123-456')
    });
    return schema.validate(customer);
}

router.post('/', async(req, res)=>{
    
    let customer= req.body;
    const {error}=  validation(customer)
    if(error) return res.status(404).json( error.message)

    customer = new Customer(customer);
    try {
       customer=await customer.save()
    } catch (error) {
        return res.status(400).send(error.message)  
    }
    res.send(customer);
})

router.put('/:id',async(req,res)=>{
    let customer= req.body;
    let _id= req.params.id;
    const {error}=  validation(customer)
    if(error) return res.status(404).json( error.message)
    try {
        customer = await Customer.findByIdAndUpdate(_id, customer,{
            new:true
        })
        
        res.send(customer)
        
    } catch (error) {
        res.status(404).json( error.message)
    }
    
})

router.delete('/:id', async (req, res)=>{
    let _id= req.params.id;
    try {
        customer = await Customer.findByIdAndDelete(_id)
        
        res.send(customer)
        
    } catch (error) {
        res.status(404).json( error.message)
    }
})

module.exports = router;
