const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/temp-exercises', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(status => console.log(' Connect with temp-exercises'))
    .catch(err => console.log('Error is', err.message));
const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
})


const Author = mongoose.model('author', authorSchema);
const Course = mongoose.model('course', new mongoose.Schema({
    name: String,
    author: {
        type: authorSchema
    }
}))

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    })
    console.log(author)
    const result = await course.save();
    console.log(result)

}

//createCourse('NOde js', new Author({name:"Asad", bio:"Writing books"}));
async function updateAuthor(courseId) {
    //// first method of update 
    // const course = await Course.findById(courseId);
    // course.author.name='Asad Hameed';
    //  await course.save();

    //     // Second method of update

    //    const courseUpdate=  await Course.update({_id:courseId},{
    //         $set:{
    //             'author.name':'Asad Hameed Afird'
    //         }
    //     }, {new :true})

    // delete the author properties
    const courseBeforeUpdate = await Course.update({ _id: courseId }, {
        $unset: {
            'author': ''
        }
    })


    console.log(courseUpdate)
}

updateAuthor('5f625cf413e6662a5c521f60')
async function listCourse() {
    const courseList = await Course
        .find()
        .select('name -_id author');
    console.log(courseList)
}
listCourse();