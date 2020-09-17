const express=require('express');
const Course = require('./database');
const  router= express.Router();
const course =require('./database')

// Read 
router.get('/', async (req, res)=>{ 
   const cr= await course.find();
    res.json(cr)
})

//write
router.post('/',async(req, res)=>{
   // const newCourse= req.body;
    const course= new Course(req.body)
    const creatCoure = await course.save();
   // console.log(course)
    res.json(creatCoure)
})

router.put('/' ,async(req, res)=>{
    const _id =req.body._id;
    // both is working :)
  // await Course.findByIdAndUpdate(_id,req.body, { overwrite : true})
    await Course.update(_id,req.body, { overwrite : true})
    const getUser = await Course.find({_id})
    res.send(getUser)
})

router.delete('/' ,async(req, res)=>{
    const _id =req.body._id;
    // both is working :)
  // await Course.findByIdAndUpdate(_id,req.body, { overwrite : true})
    await Course.deleteOne({_id})
    //const getUser = await Course.find({_id})
    res.send('Delete the operation')
})

module.exports=router;