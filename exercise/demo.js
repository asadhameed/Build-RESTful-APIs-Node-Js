const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', ({ useUnifiedTopology: true, useNewUrlParser: true }))
    .then(status => console.log("connect with db"))
    .catch(err => console.log('Error', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
})

const Course = mongoose.model('courses', courseSchema);
/************************************************
 * Exercise 1
 * Get all the published backend courses
 * sort them by their name,
 * pick only their name and author name
 * and display them
 * 
 * some good information
 * sort('name') =sort({name:1}) ascending order
 * sort('-name') =sort({name:-1}) descending order
 * select('name author') = select({name:1, author:1})
 *************************************************/
async function getCourses() {

    const courses = await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 })
        ;
    console.log(' Exercise 1----------')
    console.log(courses);
}
getCourses()


/************************************************
 * Exercise 2
 * Get all the published frontend and backend courses
 * sort them by prices in a descending order
 * pick only their name and author name
 * and display them
 * 
 * another way of find
 * .find({isPublished:true , tags:{ $in: ['backend' ,'frontend']}})=
 * .find({isPublished:true })
 *   .or([{tags:'backend'},{tags:'frontend'}])
 *************************************************/

async function getCourses2() {

    const courses = await Course
        .find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } })
        //  .or([{tags:'backend'},{tags:'frontend'}])
        .sort('-price')
        .select('name author price')
        ;
    console.log(' Exercise 2----------')
    console.log(courses);
}
getCourses2()



/************************************************
 * Exercise 3
 * Get all the published courses that are $15 or more
 * sor have the word 'by' in their title
 *
 * 
 * another way of find
 * .find({isPublished:true , tags:{ $in: ['backend' ,'frontend']}})=
 * .find({isPublished:true })
 *   .or([{tags:'backend'},{tags:'frontend'}])
 *************************************************/

async function getCourses3() {
    const courses = await Course.find({ isPublished: true })
        .or([{
            price: {$gte: 15}
        },
        {name: /.*by.*/ }
        ])
        .sort('-price')
        .select('name author price  isPublished');
    console.log(' Exercise 3----------')
    console.log(courses);
}
getCourses3()

