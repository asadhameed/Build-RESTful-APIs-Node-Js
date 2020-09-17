const mongo= require('mongoose');

//for(let i=0; i<20000; i++){
    const id = mongo.Types.ObjectId()
    console.log(id)
    console.log(id.getTimestamp())
   
    // Id validation method
     let isValid= mongo.isValidObjectId(id)
     console.log(isValid);
     isValid= mongo.isValidObjectId('23223232')
     console.log(isValid)
//}