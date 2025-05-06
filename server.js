require('dotenv').config(); // Add this at the top

var express=require("express");

var mysql2=require("mysql2");

var a=express();

a.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
a.use(express.json()); // for parsing application/json

a.listen(2005,function(){
    console.log("Server Started");
})

let config="mysql://avnadmin:AVNS_EMDLMEESHpTYfD3mM4P@mysql-13392e1b-maheshsingla2006-35f6.k.aivencloud.com:19533/defaultdb";

let db=mysql2.createConnection(config);

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
            res.send(`<script>alert("Signup failed: ${err.message}"); window.history.back();</script>`);
        } else {
            res.send(`<script>alert("Signed up successfully!"); window.location.href = '/homepage.html';</script>`);        }
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

a.post("/submit-expense", function(req, res) {
    let { amount, note, category, date } = req.body;

    let query = "INSERT INTO expenses (amount, note, category, dot) VALUES (?, ?, ?, ?)";

    db.query(query, [amount, note, category, date], function(err, result) {
        if (err) {
            console.error("Insert error:", err.message);
            res.json({ error: "Database error: " + err.message });
        } else {
            res.json({ message: "Expense added successfully!" });
        }
    });
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