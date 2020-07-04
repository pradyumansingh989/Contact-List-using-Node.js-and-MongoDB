const express = require('express');
const port = 8000;
var path = require("path");

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// // middleware 1
// app.use(function(req, res,next){
//     req.myName = "pradyuman";
//     // console.log('middleware 1 called');
//     next();
// });

// //middleware 2 

// app.use(function(req,res,next){
//     console.log('my name from mw2',req.myName);
//     // console.log('middleware 2 called ');
//     next();
// });


var contactList = [
    {
        name: "Pradyuman",
        phone: "9560570766"
    },
    {
        name: "Tony Stark",
        phone: "9585452451"
    },
    {
        name: "Spiderman",
        phone: "9585454551"
    }
]

app.get('/',function(req,res){
    //console.log(req.myName);


    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching the contact list from the db');
            return;
        }

        return res.render('home',{
            title: "contacts List",
            contact_list: contacts
        });
    });
});

app.get('/practice',function(req,res){
     return res.render('practice',{title:"let us play with EJS"});
});


app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    //contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err,newContact){
        if(err){console.log('error in creating a contact!');return;}
        console.log('*********',newContact);
        return res.redirect('back');
    });
});


app.get('/delete-contact/:phone',function(req,res){
    //get the id from query in the ul
    let id = req.query.id;
    let phone = req.query.phone;

    //find the contact in the database using id and delte
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
    });
    return res.redirect('back');

});


app.listen(port,function(err){
    if(err){console.log('error in running the server',err);}
    console.log('yup! my express server is running on port:',port);
});