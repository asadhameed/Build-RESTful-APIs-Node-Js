const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/temp-exercises',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(status=>console.log(' Connect with temp-exercises'))
    .catch(err=> console.log('Error is', err.message));

const Author =mongoose.model('author', new mongoose.Schema({
    name:String,
    bio:String,
    website:String
}))

const Course= mongoose.model('course', new mongoose.Schema({
    name:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'author'
    }
}))

async function creatAuthor(name,bio,website){
    
    const author = new Author({
        name,
        bio,
        website
    })

    const result =await author.save();
    console.log(result);
}

//creatAuthor('asad','I write lot of books','www.author.com')


async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    })    

    const result = await course.save();
    console.log(result)

}

//createCourse('NOde js', '5f6210151bebaf1258f566cd');

async function listCourse() {
    const courseList = await Course
        .find()
      //  .populate('author')  // this will show author information because course have author id as reference
      .populate('author','name bio -_id')  //  one parameter for reference document  and another parameter which fields you want show
      .populate('category' , 'name') // we can populate multiple documents
      // .select('name author -_id'); // this will show only name of course
        .select('name -_id author'); // this will show name and author and hide _id
    console.log(courseList)
}
listCourse();