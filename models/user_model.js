var mongoose=require('mongoose')
// var Contact=require('./Contact')


var Form=new mongoose.Schema({
    sendAlert:{
        type: Boolean,
        default:false
    },
    sms:{
        type:Boolean,
        default:true
    },
    message:{  
        type:String
    },
    location:{
        type:String
    },
    time:{
        type:Number
    }
})



module.export=mongoose.model('Form',Form)


var User=new mongoose.Schema({
    name:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    forms:{
type:[Form]
    },
    users:[this],

   contacts:[{type: mongoose.Schema.Types.ObjectId,
    ref:"contacts"
   }],
   contacts:{
       type:Array
   },
subscribers:{
    type:Array
},
currentuser:{
    type:String

},
alertsreceived:[{
    type:Object
}],
receivedMessages:[{
type:Object
}]
})

module.exports = mongoose.model('User', User);
