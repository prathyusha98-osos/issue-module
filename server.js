var express = require('express');
var app= express();
var bodyParser=require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
// var mongoose=require('mongoose');
// mongoose.connect("mongodb://localhost:27017/osos");

const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://osos:osos123@ds359118.mlab.com:59118/issues", {
    keepAlive: true,
    useNewUrlParser: true
});
var http=require('http')
let server=http.createServer(app)
var Customer=require('./models/Contacts');
 var User=require('./models/user_model')
 var Issue=require('./models/issue')
 var _ = require('lodash');
 var _ = require('lodash/core');


//  var User=require('./Users')
app.listen(3000,()=>{
  console.log("start the server with port 3000")
})

app.get("/", (req, res) => {
  res.render('login')
});


app.get("/add", (req, res) => {
  res.render('addcontact')
});


app.get("/contacts", (req, res) => {
  res.render('contacts')
});




app.post('/add/user/contact',(req,res)=>{
  console.log(req.body.name)
  Customer.find({name:contact},(err,user)=>{
    if(err){
      console.log(err)
    }else{
      if(Customer.contact.legth<=5){
        var contact=new Contact({
          name:req.body.username,
          phoneNumber:req.body.phoneNumber
        });contact.save().then(data=>{
          console.log("contact added successfully")
          res.render("contacts")
        })
      }else{
        console.log("contact list be filled")
      }
    }
  })



})
 





var currentuser='';


app.post('/login',(req,res)=>{
  User.find({},(err,users)=>{
      if(err){
          console.log(err)
          res.redirect('/')

      }else{
      //  console.log(users.includes(req.body.username))
        var userexists=false;
        for(var i=0;i<users.length;i++){
          // console.log(users[i].name);
            if(users[i].name==req.body.username){
              // console.log(req.body.username)
              userexists=true;
              currentuser=users[i].name
            }
        }
        // console.log(currentuser)

        if(userexists){
        res.redirect('/dashboard')
        }else{
          res.redirect('/');
        }
      }
  })
})



app.get('/signup',(req,res)=>{
  res.render('signup')
})

app.get('/login',(req,res)=>{
  res.redirect('/');
})

app.get('/logout',(req,res)=>{
  res.redirect('/')
  currentuser=""
})

app.post('/signup',(req,res)=>{
var userexists=false;
  User.find({},(err,users)=>{

    if(err){
      console.log(err);
      res.redirect('/')
    }
    for(var i=0;i<users.length;i++){
      if(users[i].name==req.body.username){
        userexists=true;
      console.log("user already exists")

      }
    }
    if(userexists==true){
      res.redirect('/signup');
      console.log("user already exists")
    }else{
      User.create({
        name:req.body.username,
        contacts:[],
        subscribers:[],
        forms:[]
      },(tee,tyy)=>{
        if(tee){
          // console.log(tee);
          res.redirect('/signup');
        }else{
          console.log('created successfuly');
          res.redirect('/');
        }
      })
      
    }

  })
})


app.get("/dashboard",(req,res)=>{
  if(currentuser.length>0){
    User.find({},(err,users)=>{
      if(err){
        console.log(err)
        res.redirect('/');
      }else{
        var subscribers=[];
        var contacts=[];
        var alertsreceived=[];
        var receivedMessages=[];
        for(var i=0;i<users.length;i++){
          if(users[i].name==currentuser){
            // console.log(users[i]);
            subscribers=users[i].subscribers;
            contacts=users[i].contacts;
            alertsreceived=users[i].alertsreceived;
            receivedMessages=users[i].receivedMessages;
          }
        }
        // console.log('alert for this user');
        // console.log(alertsreceived);
        // console.log('messages for this user');
        // console.log(messagesreceived);
        // console.log('1');
        // console.log(subscribers)
        res.render('dashboard',{users:users,currentuser:currentuser,contacts:contacts,subscribers:subscribers})
      }
    })
  }else{
    // console.log("login first");
    res.redirect('/')
  }
  
})


app.post('/add/contact',(req,res)=>{
  if(req.body.username.length>0){
User.find({name:currentuser},(err,user)=>{
if(err){
  console.log(err)
  res.redirect('/dashboard')
}else{
  var user=user[0]
  if(user.contacts.length>5){
    console.log("contact list be filled")
    res.redirect('/dashboard')
  }else{
    if(user.contacts.includes(req.body.username)){
      res.redirect('/dashboard')
       }else{
         user.contacts.push(req.body.username)
         User.updateOne({name:currentuser},user,(terr,tdata)=>{
           if(terr){
             console.log(terr)
             res.redirect('/dashboard')
           }else{
      console.log("contact added successfully")
      res.redirect('/dashboard')
           }
         })
       
       }
 
  }
 

  
}
})
  }

})


app.post('/add/subscriber',(req,res)=>{
  if(req.body.username.length>0){
User.find({name:currentuser},(err,user)=>{
if(err){
  console.log(err)
  res.redirect('/dashboard')
}else{
  var user=user[0]
  // console.log(user)
 if(user.subscribers.includes(currentuser)){
   console.log("already subscribed")
res.redirect('/dashboard')
 }else{
   user.subscribers.push(req.body.username)
   User.updateOne({name:currentuser},user,(terr,tdata)=>{
     if(terr){
       console.log(terr)
       res.redirect('/dashboard')
     }else{
console.log("subscriber added successfully")
res.redirect('/dashboard')
     }
   })
 }
}
})
  }
})



app.post('/user/form/submit',(req,res)=>{
  
  var contacts=[];
  var subscribers=[];
  User.find({name:currentuser},(err,users)=>{
  if(err){
    console.log(err)
  }
  else{
    if(users.length>0){
      subscribers=users[0].subscribers;
      contacts=users[0].contacts
    }
if(req.body.alert=='yes'){
  //  for(var i=0;i<subscribers.length;i++){
    if(subscribers.length>0){
      User.find({name:subscribers},(serr,suser)=>{
        if(serr){
          console.log(serr)
        }else{
          for (let i = 0; i < suser.length; i++) {
          if(suser[i].alertsreceived==undefined || suser[i].alertsreceived.length==[]){
            suser[i].alertsreceived=[
              author=currentuser,
              alertmessage="enables alert by "+ author
            ]
          }else{
              suser[i].alertsreceived.push(
                author=currentuser,
                alertmessage="enables alert by "+author
              )
              
            }
          }
           console.log(suser)
         User.update({name:users},suser,(userr,ussucc)=>{
            if(userr){
              console.log(userr)
            }else{
              console.log(ussucc);
              console.log('alert updated sucessfully')

            }
          })
        }
      })
    }else{
      console.log("no subscribers are there for user")
    }
   
  // }
 }
    else{
      console.log("disabled")
    }    
    if(req.body.message=='yes'){
  if(contacts.length>0){
          User.find({name:contacts},(serr,suser)=>{
            if(serr){
              console.log(serr)
            }else{
              for (let i = 0; i < suser.length; i++) {
              if(suser[i].receivedMessages==undefined || suser[i].receivedMessages.length==0){
                suser[i].receivedMessages=[
                  author=currentuser,
                  message=req.body.textmessage
                ]
              }else{
               
                  suser[i].receivedMessages.push(
                    author=currentuser,
                    message=req.body.message
                  )
                  
                }
              }
               console.log(suser)
             User.updateOne(suser,(userr,ussucc)=>{               
                if(userr){
                  console.log(userr)
                }else{
                  console.log(ussucc);
                  console.log('message send sucessfully')
                }
              })
            }
          })
        }else{
          console.log("no contacts are there for user")
        }
       
      // }
     }
        else{
          console.log("disabled")
        }  
  }
  })

  res.redirect('/dashboard')
})

app.get("/getdata",(req,res)=>{
  Contact.findOne({name:req.body.name}.then(list=>{
    console.log(list)
  }))
})



app.get("/update", (req, res) => {
  res.sendFile(__dirname + "/edit.html");
});



app.put('/update/:id',(req,res)=>{
  Contact.findOne({_id:req.params.id}).then((contacts)=>{
    contacts.name=req.body.name,
    contacts.phoneNumber=req.body.phoneNumber,
    contacts.save().then((cont)=>{
      res.send({'message':'customer updated successfully','statusCode':0,data:cont})
    }) 
  }).catch((e)=>{
    res.send({'statusCode':1,'message':e});
  });
})



app.delete('/delete/:id',(req,res)=>{
  Contact.findOneAndRemove({_id:req.params.id}).then((contacts)=>{
    res.send({"message":"contact deleted"})
})
});



app.get("/buy", (req, res) => {
  res.render('buy')
});


app.get("/product", (req, res) => {
  res.render('products')
});

// app.get("/info", (req, res) => {
//   res.render('info')
// });


app.get('/info',(req,res)=>{
  User.find({},(err,list)=>{
    if(err){
      console.log(err)
    }
else{
  console.log(list)
    res.render("info",{users:list})
  
}
  })

})




app.get("/button", (req, res) => {
  res.render('button')
});


app.get("/buyers", (req, res) => {

  User.find({desc:"buyer"},(err,list)=>{
    if(err){
      console.log(err)
    }
else{
  console.log(list)
  // for(var i=0;i<list.length;i++){

  //   console.log(list[i].name);
  //   console.log(list[i].desc)
    res.render("buyers",{buyers:list})
  // }
  
}
  res.render('buyers')
})
});app.get("/sellers", (req, res) => {

  User.find({desc:"seller"},(err,list)=>{
    if(err){
      console.log(err)
    }
else{
  console.log(list)
  // for(var i=0;i<list.length;i++){

  //   console.log(list[i].name);
  //   console.log(list[i].desc)
    res.render("sellers",{sellers:list})
  // }
  
}
  res.render('buyers')
})
});

app.get("/users", (req, res) => {
  res.render('users')
});


app.get("/issue", (req, res) => {
  res.render('issue')
});


app.post("/submit", (req, res) => {
Issue.findOne({name:req.body.name}).then(user=>{
if(user){
console.log(user)
console.log("already exist");
var newIssue=new Issue({
   issue :req.body.issue
});newIssue.save().then(data=>{
  console.log(data);

  // var object=[];
  // var object=_.merge(data,user)
  // console.log(object)
  // console.log(JSON.stringify(_.mergeWith(data,user)));
})
}else{
  var issue =new Issue({
    name:req.body.name,
    issue:req.body.issue,
    caseId:req.caseId
     });issue.save().then(data=>{
       console.log(data)
      //  data.issues.push(issue._id)
       res.send({"message":"your issue is send successfully",data:data} )
       });
}
})
  })

app.get("get/issues",(req,res)=>{
  Issue.find({name:name})
})


app.get("/msg", (req, res) => {
  res.render('msg')
  
});




