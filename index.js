const { ejs } = require("ejs");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const { strict } = require("assert");
const userdetail = require("./models/userdetail.js");
const user1 = require("./models/addpayment.js");

const methodOverride = require('method-override')
const admin = require("./routes/admin.js");
const user = require("./routes/user.js");

//============================================
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/trust");
  //mongodb ke shath connection banane ke liya
}
//====================================

main()
  .then((res) => {
    console.log("conection sussecfull");
  })
  .catch((err) => console.log(err));

//=======================================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))
app.use("/trust/admin",admin);
app.use("/trust/user",user);

// ===========================================================================================
// =============LISTEN REQUEST=======================================

app.listen(port, () => {
  console.log("listen the server");
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




// registration USER ADD payment  DATA member REQUEST=============================

app.post("/trust/:id/addpay", async (req, res) => {
  let { id } = req.params;
  let { userName,userId, name, payment, date } = req.body;
  // donor.push({ username, name, payment, date });
  let don = await userdetail.find({ userName: userName });
  const data = don[0];

  const newuser1 = new user1({
    userName: userName,
    userId:userId,
    name: name,
    payment: payment,
    date: date,
  });
  newuser1
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  res.render("add.ejs", { userName, id, data });

  console.log("new", id, req.body, userName);
});

// *******************************************
// *******************************************
// *******************************************

// ====================================================================
// ====================================================================
// ============================USER API================================
// ====================================================================
// ====================================================================
// ====================================================================








// add request ========================================
app.post("/trust/add/:userName/", async (req, res) => {
  let { userName } = req.params;
  let don = await userdetail.find({ userName: userName });
  const data = don[0];
  if (data) {
    res.render("add.ejs", { data });
    console.log(data);
  } else {
    res.render("alert&signup.ejs", { data });
  }

  console.log(data, userName);

  // res.send(don);
});

// userlist========================================

app.get("/trust", (req, res) => {
  res.render("homepage.ejs");

  console.log("/trust");
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
