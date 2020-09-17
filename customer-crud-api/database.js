const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(status => console.log('Connect with mongo-exercises database'))
    .catch(err => console.log('Errors occurs ', err))

const customerSchema = new mongoose.Schema({
    name: { type: String, required: [true,'Customer name is required'], minlength: 4, maxlength: 20 },
    phone: {
        type: String,
        validate: {
            validator: function (ph) {
                const pattern = /^\d{3}-\d{3}$/;
                return (ph.match(pattern)) ? true : false;
            },
            message: '{VALUE} is not a valid phone number! valid formate is 123-456'
        },
        required: [true, 'User phone number required']
    },
    isGold: { type: Boolean, default: false }
})
const Customer = mongoose.model('customer', customerSchema);
// async function createUser() {
//     const customer = new Customer({
      
//         phone: '123-453'
//     })
//     try {
//         await customer.validate()
//         console.log('validation')
//     } catch (error) {
//         console.log(error.message)
//     }
// }
// createUser();
module.exports= Customer;