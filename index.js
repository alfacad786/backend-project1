require("dotenv").config();
// console.log(process.env)

const { ejs } = require("ejs");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const { strict } = require("assert");
const userdetail = require("./models/userdetail.js");
const user1 = require("./models/addpayment.js");
const { MongoClient } = require("mongodb");
const methodOverride = require("method-override");
const admin = require("./routes/admin.js");
const user = require("./routes/user.js");
// import { MongoClient } from "mongodb";
//===================for mongodb connection======================

const dburl = process.env.Db_test_Url;
console.log(dburl);

//=======================================

const mongodbconect=mongoose.connect(dburl);


async function main() {
  await mongodbconect;
}
main()
  .then((res) => {
    console.log("conection sussecfull");
   
  })
  .catch((err) => console.log(err, "conection not sussecfull"));





//=======================================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use("/trust/admin", admin);
app.use("/trust/user", user);

// ===========================================================================================
// =============LISTEN REQUEST======================

app.listen(port, () => {
  console.log(`listen the server to:  http://localhost:${port}`);
});

// =============meddleware======================
// app.use("/", (req, res, next) => {
//   console.log("req.path");
//   next();
// });

// app.use("/trust/user", (req, res, next) => {
//   console.log("/trust/us");
//   res.redirect("/trust/username");
// });

// app.use("/trust/total", (req, res, next) => {
//   let tokan=req.query

//   console.log("/trust/us");
//   res.redirect("/trust/username");
// });

// *******************************************
// *******************************************
// *******************************************

// userlist========================================

app.get("/", (req, res) => {
  res.render("homepage.ejs");

  console.log("-/-");
});

// home totallist==================================================
app.get("/trust/total", async (req, res) => {
  let username = req.params;
  let don = await userdetail.find();
  res.render("totallist.ejs", { don });
  console.log("total list ");
});

//search donorform for username=============================================
app.get("/trust/us", async (req, res) => {
  let { userName } = req.query;
  let don = await userdetail.find({ userName: userName });

  res.render("searchform.ejs", { don });
  console.log(userName);
});

// app.get("/trust/user", async(req, res) => {
//   let {userName} = req.query.username;
//   // let don = await userdetail.find({userName:userName});
//   let don = userdetail.find((v) => userName === userdetail.userName);

//   // res.render("useraccount.ejs",{don} );

//   if (don) {
//     res.render("useraccount.ejs",{don});
//   } else {
//    res.render("searchformalert.ejs",{don});
//   }
//   // res.render("searchformalert.ejs", {don });
//   // console.log("new serch", "/trust/user");

//   console.log(don.userName);
// });

// =============meddleware page not found======================
// app.use((req, res, next) => {
//   res.send("PAGE NOT FOUND");
// });
