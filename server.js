require('dotenv').config(); // Add this at the top

var express=require("express");

var mysql2=require("mysql2");

var a=express();

a.listen(2005,function(){
    console.log("Server Started");
})

const db_url = process.env.DATABASE_API;
let config=db_url;

a.use(express.static("public"));

let mysqlServer=mysql2.createConnection(config);

mysqlServer.connect(function(err)
{
    if(err==null)
        console.log("Connected to aiven Database Server Successfully");
    else
    console.log(err.message);
})

a.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "signup.html"));
});

a.post("/signup", function(req, res) {
    let username = req.body.txtuser;
    let email = req.body.txtemail;
    let pwd = req.body.password;

    // Add id and primary key to usersfee
    let query = "INSERT INTO usersfee (user, email, pwd) VALUES (?, ?, ?)";

    db.query(query, [username, email, pwd], function(err, result) {
        if (err) {
            res.send("Error: " + err.message);
        } else {
            res.send("Signed up Successfully!");
        }
    });
});

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