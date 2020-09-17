const mongoose =require('mongoose');
    
mongoose.connect('mongodb://localhost/mongo-exercises',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(status=>console.log(' Connect with mongo-exercises'))
    .catch(err=> console.log('Error is', err.message));

const courseSchema=new mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    date :{type:Date , default:Date.now},
    isPublished:Boolean
})

const Course = mongoose.model('courses', courseSchema)
module.exports=Course;