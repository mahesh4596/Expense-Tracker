var express=require("express");

var mysql2=require("mysql2");

var a=express();

a.listen(2005,function(){
    console.log("Server Started");
})

let config="mysql://avnadmin:AVNS_EMDLMEESHpTYfD3mM4P@mysql-13392e1b-maheshsingla2006-35f6.k.aivencloud.com:19533/defaultdb";

a.use(express.static("public"));

let mysqlServer=mysql2.createConnection(config);
mysqlServer.connect(function(err)
{
    if(err==null)
        console.log("Connected to aiven Database Server Successfully");
    else
    console.log(err.message);
})

a.get("/signup",function(req,resp){
    let path=__dirname+"/public/signup.html";
    resp.sendFile(path);
})

a.get("/privacy",function(req,resp){
    let path=__dirname+"/public/privacy.html";
    resp.sendFile(path);
})

a.get("/tc",function(req,resp){
    let path=__dirname+"/public/T&C.html";
    resp.sendFile(path);
})

a.get("/faq",function(req,resp){
    let path=__dirname+"/public/FAQ.html";
    resp.sendFile(path);
})

a.get("/",function(req,resp){
    let path=__dirname+"/public/wlcm.html";
    resp.sendFile(path);
})

a.get("/value",function(req,resp){
    let path=__dirname+"/public/value.html";
    resp.sendFile(path);
})

a.get("/working",function(req,resp){
    let path=__dirname+"/public/working.html";
    resp.sendFile(path);
})

a.get("/home",function(req,resp){
    let path=__dirname+"/public/homepage.html";
    resp.sendFile(path);
})

a.use("/signup",function(req,resp){
    resp.send("Signed Up Successfully");
})