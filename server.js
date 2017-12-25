const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const post = process.env.PORT || 8000;
var app = express();

hbs.registerPartials(__dirname+"/views/partials");
app.set("view_engine",'hbs');

//app.use(function(req, resp, next){
//     var data = {
//        title:"Maintenance Page",
//        body:"Page needed some attention."
//    }
//    resp.render('maintenance.hbs', data);
//});
app.use( function(req,resp,next){
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


hbs.registerHelper("getCurrentYear", function(){
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", function(text){
    return text.toUpperCase();
});

app.get("/", function(req,resp){
    var data = {
        title:"Home Page",
        body:"boner"
    }
   resp.render('home.hbs', data);
})

app.get("/about", function(req, resp){
    var data = {
        title:"About Page",
        body:"party time in the osakrs Brichs"
    }
   resp.render('about.hbs', data);
});

app.get("/bad", function(req, resp){
    resp.send({
        error:"Bad link, hombre~"
    })
})

app.listen(port,function(){
    console.log(`server listening on post ${port}`);
});
