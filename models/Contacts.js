var mongoose=require('mongoose')


var Contact=new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    phoneNumber: {
        type: Number,
        required: true,
        minlength: 10       
    }
})


module.exports = mongoose.model('Contact', Contact);


var Customer=new mongoose.Schema({
    name:{
        type:String
    },
    contact:{
        type:[Contact]
    }
})


module.exports=mongoose.model('Customer',Customer)