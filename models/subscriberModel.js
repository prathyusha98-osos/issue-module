var mongoose=require('mongoose')

var Subscriber = new mongoose.Schema({
    name:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    password:{
        type:String,
        required: [true,'Password is required'],
        minlength: [8,'Password should be more than 8 character']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
})
module.exports = mongoose.model('Subscriber', Subscriber);