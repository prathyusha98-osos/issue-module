var mongoose=require('mongoose');

var notificationSchema=new mongoose.schema({
    msg:{
        type:String
    }
})



var Notification = mongoose.model('Notification',notificationSchema);

module.exports = {Notification}