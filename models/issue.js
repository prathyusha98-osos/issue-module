var mongoose=require('mongoose')


var Issue=new mongoose.Schema({
    name: {
        type: String
        //  required:true
    },
   issue:{
    type:String
   },
   date:{
       type:Date
   }
})
module.exports = mongoose.model('Issue', Issue);




    
    
// const issueListSchema=new mongoose.Schema({
//     name:String,
//     issues:[{
//     type:mongoose.Schema.Types.ObjectId,
//             ref:'Issue'}]
//     })
//     module.exports=mongoose.model("IssueList",issueListSchema,"IssueList")


//     const issueSchema=new mongoose.Schema({
//         issue:String
//     })
//     module.exports=mongoose.model("Issue",issueSchema,"issues")