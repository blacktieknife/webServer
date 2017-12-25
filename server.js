const express = require('express');
const ejs = require('ejs');
const fs = require('fs');

const port = process.env.PORT || 8000;
var app = express();


app.set("view_engine",'ejs');


//example of custom "middleware" to display a Maintenance page on any incoming requests
//---------------------------------------//
//app.use(function(req, resp, next){
//     var data = {
//        title:"Maintenance Page",
//        body:"Page needed some attention."
//    }
//    resp.render('maintenance.hbs', data);
//});
//--------------------------------------//

//custom "middleware" to intercept anything coming in on the app & logs it to the root in server.log
app.use(function(req,resp,next){
    var now = new Date().toDateString();
    var reqUrl= req.url;
    var reqMethod = req.method;
    var log = `now : ${now}, req URL : ${reqUrl}, Method : ${reqMethod}`;
   
    console.log(log);
    fs.appendFile('server.log', log + "\n", function(err){
        if(err){
            console.log("unable to append to server.log");
        }
    })
    next();
});

app.use(express.static(__dirname+"/public/"));


app.get("/", function(req,resp){
    var data = {
        title:"Home Page",
        body:"Biffed on the landing page. oof"
    }
   resp.render('home.ejs', data);
})

app.get("/about", function(req, resp){
    var data = {
        title:"About Page",
        body:"Hello. Im re-building the same thing 1000's of other people built. don't mind me."
    }
   resp.render('about.ejs', data);
});

app.get("/projects", function(req, resp){
    var data = {
        title:"Projects Page",
        body:"Here lie the dead & conquered projects of the past."
    }
   resp.render('projects.ejs', data);
});

app.get("/bad", function(req, resp){
    resp.send({
        error:"Bad link, hombre~"
    })
})

app.listen(port,function(){
    console.log(`server listening on post ${port}`);
});
