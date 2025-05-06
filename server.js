
// Load environment variables
require('dotenv').config();

// Import required modules
var express = require("express");
var mysql2 = require("mysql2");
const path = require("path"); // Needed for serving static files using path.join

var a = express();

// Middleware to parse incoming request bodies
a.use(express.urlencoded({ extended: true }));
a.use(express.json());

// Start the Express server
a.listen(2005, function () {
    console.log("Server Started");
});

// MySQL connection string
let config = "mysql://avnadmin:AVNS_EMDLMEESHpTYfD3mM4P@mysql-13392e1b-maheshsingla2006-35f6.k.aivencloud.com:19533/defaultdb";

// Create MySQL connection
let db = mysql2.createConnection(config);
let mysqlServer = mysql2.createConnection(config);

// Serve static files from the 'public' directory
a.use(express.static("public"));

// Connect to MySQL server
mysqlServer.connect(function (err) {
    if (err == null)
        console.log("Connected to Aiven Database Server Successfully");
    else
        console.log(err.message);
});

// Route to serve signup page
a.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "signup.html"));
});

// Handle signup form submission
a.post("/signup", function (req, res) {
    let username = req.body.txtuser;
    let email = req.body.txtemail;
    let pwd = req.body.password;

    // Insert new user into usersfee table
    let query = "INSERT INTO usersfee (user, email, pwd) VALUES (?, ?, ?)";

    db.query(query, [username, email, pwd], function (err, result) {
        if (err) {
            res.send(`<script>alert("Signup failed: ${err.message}"); window.history.back();</script>`);
        } else {
            res.send(`<script>alert("Signed up successfully!"); window.location.href = '/homepage.html?user=${username}';</script>`);
        }
    });
});

// Route to serve privacy policy page
a.get("/privacy", function (req, resp) {
    let path = __dirname + "/public/privacy.html";
    resp.sendFile(path);
});

// Route to serve terms and conditions page
a.get("/tc", function (req, resp) {
    let path = __dirname + "/public/T&C.html";
    resp.sendFile(path);
});

// Route to serve FAQ page
a.get("/faq", function (req, resp) {
    let path = __dirname + "/public/FAQ.html";
    resp.sendFile(path);
});

// Route to serve welcome/landing page
a.get("/", function (req, resp) {
    let path = __dirname + "/public/wlcm.html";
    resp.sendFile(path);
});

// Route to serve value.html
a.get("/value", function (req, resp) {
    let path = __dirname + "/public/value.html";
    resp.sendFile(path);
});

// API to fetch user details by username
a.get("/get-user", function (req, res) {
    let username = req.query.user;
    let query = "SELECT * FROM usersfee WHERE user = ?";
    db.query(query, [username], function (err, result) {
        if (err) {
            res.json({ error: err.message });
        } else if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.json({ error: "User not found" });
        }
    });
});

// API to insert a new expense entry
a.post("/submit-expense", function (req, res) {
    let { amount, note, category, date } = req.body;

    // Insert expense into expenses table
    let query = "INSERT INTO expenses (amount, note, category, dot) VALUES (?, ?, ?, ?)";

    db.query(query, [amount, note, category, date], function (err, result) {
        if (err) {
            console.error("Insert error:", err.message);
            res.json({ error: "Database error: " + err.message });
        } else {
            res.json({ message: "Expense added successfully!" });
        }
    });
});

// Route to serve working.html
a.get("/working", function (req, resp) {
    let path = __dirname + "/public/working.html";
    resp.sendFile(path);
});

// Route to serve homepage.html
a.get("/home", function (req, resp) {
    let path = __dirname + "/public/homepage.html";
    resp.sendFile(path);
});

// Redundant fallback route for /signup (can be removed if not needed)
a.use("/signup", function (req, resp) {
    resp.send("Signed Up Successfully");
});
