const { ejs } = require("ejs");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ===============================================
let member=[

]

let donor = [
  {
    username: "asifshaikh",
    name: "Asifiqbal",
    payment: 5000,
    date: "2023-12-08",
  },
  {
    username: "ayanshaikh",
    name: "ayan",
    payment: 4000,
    date: "2023-02-06",
  },
  {
    username: "aaliyashaikh",
    name: "aaliya",
    payment: 7000,
    date: "2022-12-21",
  },
];
// =========new registration member REQUEST=======================================
app.post("/donor/newmember", (req, res) => {
  // let username = req.params.p.i
  let { username, password,Mobile,email } = req.body;
  member.push({ username, password, Mobile,email});
  res.redirect("/donor/username");

  console.log("new", "/donor/newmember", req.body);
});

// registration USER ADD DATA member REQUEST==========================================================


app.post("/donor", (req, res) => {
  // let username = req.params.p.i
  let { username, name, payment, date } = req.body;
  donor.push({ username, name, payment, date });
  res.redirect("/donor/username");

  console.log("new", req.body);
});

// =============LISTEN REQUEST=======================================

app.listen(port, () => {
  console.log("listen the server");
});
// *******************************************
// *******************************************
// *******************************************



//  =========******GET REQUEST*******========




// userlist========================================
app.get("/donor", (req, res) => {
  res.render("homepage.ejs", { donor });

  console.log("/donor");
});

//login usernam list=============================================
app.get("/donor/username", (req, res) => {
  let { username } = req.query;
  // let don = donor.find((donor) => username === donor.username);
  res.render("login.ejs");
  console.log("/donor/username");
});

// add request ========================================
app.get("/donor/add", (req, res) => {
  // let data = req.params;
  let { username } = req.query;
  let don = donor.find((donor) => username === donor.username);
  let newuser = donor.find((donor) => username !== donor.username);
  let do1 = donor.filter((donor) => username === donor.username);

  if (don) {
    res.render("add.ejs", { donor, don, do1 });
  }
  else {
    res.render("loginerror.ejs");
  }  

  console.log("/donor/add",username);
});

// user loging request ========================================
app.get("/donor/new", (req, res) => {
  // let data = req.params;
  let { username } = req.query;
  let don = donor.find((donor) => username === donor.username);
  let newuser = donor.find((donor) => username !== donor.username);
  let do1 = donor.filter((donor) => username === donor.username);

  if (don) {
    res.render("add.ejs", { donor, don, do1 });
  }
  else {
    res.render("alert&signup.ejs");
  } 

  console.log("/donor/new",username);
});





// home totallist==================================================
app.get("/donor/total", (req, res) => {
  let username = req.params;
  res.render("totallist.ejs", { donor });
  console.log("total list ");
});

//search donorform for usernamt=============================================
app.get("/donor/us", (req, res) => {

 

  res.render("searchform.ejs");
  console.log("/donor/us");
});

// SERCH  usernam list=============================================

app.get("/donor/user", (req, res) => {
  let { username } = req.query;
  let don = donor.find((donor) => username === donor.username);
  let newuser = donor.find((donor) => username !== donor.username);
  let do1 = donor.filter((donor) => username === donor.username);

  if (don) {
    res.render("useraccount.ejs", { donor, do1 });
  }
  else {
    res.render("searchformalert.ejs");
  } 

 

 

  console.log("new serch","/donor/user");

  console.log(do1);
});

