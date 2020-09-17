const mongoose = require('mongoose');

// connect with mongoodb and create customerdb if not present

mongoose.connect('mongodb://localhost/customerdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(status => console.log('connect with Customerdb'))
    .catch(err => console.log(' Error', err.message));

// Create the schema
/**********************************
 * //Explanation  of built validation
 * name:{type:String, 
 *          required:true,
 *          minlength: 5,
 *          maxlength:10
 *          match:/pattern/ // when we need we can use regular expression
 *       }  
 * 
 * // Schema Type have also some properties like type, required, enum,minlength, maxlenght,
 *  // lowercase, uppercase, trim 
 *   category:{
 *          type:String,
 *          required:true,
 *           enum:['web', 'mobile','network'],
 *              lowercase:true
 *             }
 * 
 * // Suppose price has condition when book is published then book have price
 * // we can not use arrow function here because validator function will not work 
 *  price:{type:Number , required:function(){ return this.isPublished}}
 * 
 * // For Number min and max validation.
 * // For Date min and max validation 
 * 
 * 
 *  // Number also have some properties like
 *   get: v => Math.round(v) // when read date from database and value is 15.60 convert to 164
 *                          //const customer = await Customer.find({_id:'5f60d9d61e48511480841b5a'})
 *                          //.select('name email price');
 *                          //console.log(customer[0].price); if we call customer show original value in database
 *                          // but if we cal customer.price then it will set the round value
 *   set:v => Math.round(v)    // when read data from json and write to database (15.50 => 16)
 * 
 * //Custom validation 
 *  itemList: {type:Array, required:true,
 *      validate:{
 *       
 *      validator:function(v){
 *           return v.length >0
 *      },
 *       message:'Customer should buy one item '
 *  }}
 * 
 * 
 *  //Custom validation  with  Async Validators 
 *  
 *  itemList: {type:Array,
 *      validate:{
 *      validator:function(v){
 *            return new Promise(function(resolve, reject){
 *              setTimeout(()=>{
 *                   resolve( v && v.length > 0)  
 *                },4000) 
 *              })  
 *      },
 *       message:'Customer should buy one item '
 *  }}
 * 
 * // How can iterating error in validation
 * 
 *  catch(err){
 *      for(let field in err.errors){
 *          console.log(`Error `, err.errors[field].message)
 *     }   
 * }
 *  
**********************************/ 
const customerSchema = new mongoose.Schema({
    name: {type:String, required:true, minlength:4, maxlength:20},
    email: String,
    date: { type: Date, default: Date.now },
    itemList: {type:Array,
        
        validate:{
        validator:function(v){
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                   // const result = ( v && v.length > 0);
                    resolve( v && v.length > 0)    
                },500)
            }) 
        },
        message:'Customer should buy one item '
    }},
    list:{type:String, 
        required:true, 
        enum:['first', 'second', 'third'],
        lowercase:true
    },
    isPublished:Boolean,
    price:{type:Number, 
        required:function(){return this.isPublished}, 
        min:10, 
        max:20,
        set: v=> Math.round(v),  // set value in database round value
        get: v => Math.round(v) // get the value from database round value 
    }
});

// create a model have
const Customer = mongoose.model('customers', customerSchema);
async function createCustomer() {
    const customer = new Customer({
        name:"Hameed",
        email: 'Hameed3@test.com',
        //itemList: [],
        itemList: ['tea'],
       //itemList:null,
        list:'First',
        isPublished:true,
        price:15.60

    })

   
    try{
       //  customer.validate()
        const newCustomer = await customer.save()
        console.log(newCustomer)
     
    }catch(err){
        for(let field in err.errors){
            console.log(`Error `, err.errors[field].message)
        }
   
    }
   
}

//createCustomer();


async function getCustomers() {
    // get all customer
    // const customers= await Customer.find();

    /************************************
     *  get a specific customer
     * await Customer.find({name:'asad'})
     * .sort({name:1})   //1 indicate ascending order, -1 indicate descending 
     * .sort('name') // you can also use this method for ascending order
     * .sort('-name') // use for descending order
     * .select({name:1}) // only get name of customer
     * .select('name') 
     ************************************/

    /*************************************
     * // get the first 10 customers records
     * const customer = await Customer.find({name:'asad'})
     * .limit(10) // only take first 10 customer
     * .sort({name:1})
     * .select({name:1})
     **************************************/

    /*************************************
     * const customer = await Customer.find({name:'asad'})
     * .limit(10) // only take first 10 customer
     * .sort({name:1})
     * .count()  // number of customer find 
     **************************************/

    /************************************
     *  //Complex query with or and and
     *   //if age >=45
     *  const customer = await Customer.find({name:'asad'})
     * .or([{lastName:'khan'},{ age:{$gte: 45}}]) // list of objects 
     *  
    *************************************/

    /***********************************
     * //Regular Expressions  try to read javascript Regular Expressions
     * 
     * //customer name Starts with 'asad'
     * const customer = await Customer.find(name:/^asad/)
     * 
     * //customer name End with 'hameed'
     * const customer = await Customer.find(name:/hameed$/)
     * 
     * // ignore upper and lower case
     * // contain hameed 
     * const customer = await Customer.find(name:/.*hammed.* /i)
     ***********************************/

    /*********************************
     * //Pagination  upload some amount of data
     * 
     * const pageNumber=2;
     * const pageSize=10;
     * // in real world the page number and size send inside in api
     * // /ap1/customer?pageNumber=2&pageSize=10
     * const customer = await Customer.find({name:'customer 1'})
     * .skip((pageNumber  - 1) * pageSize )
     * .limit(pageSize)
     * .sort({name:1})
     * .select({name:1});
     * 
     *********************************/

    const customer = await Customer.find({_id:'5f60d9d61e48511480841b5a'})
    .select('name email price');
    console.log(customer[0].price);

}
getCustomers();


async function updateCustomer(id , object){
    /********************************
     * // First Approach
     * // 1.Query first
     * // 2. findByID()
     * // 3. Modify its properties
     * // 4. save() 
     * 
     *  const customer = await Customer.findById(id);
     * if(!customer) return;
     * // course.isPublished=object.isPublished;
     * // course.author =object.author;
     * 
     * // the another approach
     *  course.set({
     *  isPublished:object.isPublished,
     *  author:object.author
     * })
     * 
     * const result = course.save()
     * console.log(result)
     * 
     **********************************/


      /********************************
     * // Second Approach
     * // 1.update first
     * // 2. update directly
     *  // 3. optional:get the update document
     *  
     * 
     *  //findOneAndUpdate ({_id:id}, {
     *      set:{     author:object.author,
     *      isPublished:object.isPublished
     *      },
     *          { overwrite : true} // {new:true}
     *      });
     * 
     * //updateOne(), updateMany() 
     *  const customer = await Customer.update({_id:id}, {
     *      set:{
     *              author:object.author,
     *              isPublished:object.isPublished
     *              
     *          }, { overwrite : true}
     *      });
     *
     * console.log(customer)
     * 
     **********************************/
}


async function  removeCustomer(id){
    /*****************************
     *  const result= await Customer.deleteOne({_id:id});
     *  console.log(result);
     * 
     * const result=  await Customer.deleteOne({isPublished:true});
     *  console.log(result)  // Delete all which find isPublished == true
     * 
     * const result= Customer.findByIdAndRemove(id);
     * console.log(result) // Show the customer or course which delete
     * 
    ****************************/

}

