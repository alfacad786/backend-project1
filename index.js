const { ejs } = require("ejs");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const { strict } = require("assert");
const userdetail = require("./models/userdetail.js");
const user1 = require("./models/addpayment.js");
const admindetail = require("./models/admindetail.js");
const methodOverride = require('method-override')
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

// =============POST REQUEST======================
// =========================
// =========new registration member REQUEST=======================================
app.post("/trust/newadmin/", (req, res) => {
  // let username = req.params.p.i
  let { username, password, name, city, area, mobile, email } = req.body;

  const newadmindetail = new admindetail({
    userName: username,
    passWord: password,
    name: name,
    city: city,
    area: area,
    mobile: mobile,
    email: email,
  });
  newadmindetail
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  res.redirect("/trust/newadminregi/");

  // console.log(req.body);
});

// =========================
// =========new registration member REQUEST=======================================
app.post("/trust/newmember", (req, res) => {
  // let username = req.params.p.i
  let { username, password, name, city, area, mobile, email } = req.body;

  const newUserdetail = new userdetail({
    userName: username,
    passWord: password,
    name: name,
    city: city,
    area: area,
    mobile: mobile,
    email: email,
  });
  newUserdetail
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  res.redirect("/trust/username");

  // console.log(req.body);
});

// registration USER ADD payment  DATA member REQUEST=============================

app.post("/trust/:id/addpay", async (req, res) => {
  let { id } = req.params;
  let { userName, name, payment, date } = req.body;
  // donor.push({ username, name, payment, date });
  let don = await userdetail.find({ userName: userName });
  const data = don[0];

  const newuser1 = new user1({
    userName: userName,
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

//  =========******GET REQUEST*******========
// ====================================================================
// ====================================================================
// ============================ADMIN API================================
// ====================================================================
// ====================================================================
// ====================================================================

// PRESS ADMINLOGIN BUTTON   ========================================
app.get("/trust/adminlog/", (req, res) => {
  // let { username } = req.query;
  // let don = donor.find((donor) => username === donor.username);
  res.render("adminlogin.ejs");
  console.log("/trust/adminlog/");
});

// ADMINLOGIN request ========================================
app.get("/trust/adminlog/porter/", async (req, res) => {
  let { userName } = req.query;
  let usernam = req.params;

  let don = await admindetail.find({ userName: userName });
  const data = don[0];
  if (data) {
    res.render("adminportel.ejs", { data });
  } else {
    res.render("adminloginerror.ejs", { don });
  }
  // res.render("userportel.ejs",{ data });
  console.log(usernam);
  // console.log("/trust/userportal/",{userName},{ data });
});

app.get("/trust/newadminregi/", (req, res) => {
  res.render("adminRegistration.ejs");
  // }

  console.log("/trust/newadminregi/");
});

// ====================================================================
// ====================================================================
// ============================USER API================================
// ====================================================================
// ====================================================================
// ====================================================================

// userportal request ========================================
app.post("/trust/userportal/", async (req, res) => {
  let { userName, passWord } = req.body;
  // let usernam=req.params
  let don = await userdetail.findOne({ userName: userName });
  const data = don;
  if (!don) {
    console.log("please corect the userName");
    res.render("loginerror.ejs");
  } else if (don.passWord !== passWord) {
    console.log("please corect the password");
    res.render("loginerror.ejs");
  } else {
    console.log("welcom");
    res.render("userportel.ejs", { don });
    console.log(userName, passWord, don, data.area);
  }
});

app.post("/trust/userportal/:id/", async (req, res) => {
  let { id } = req.params;
  let don = await userdetail.findById(id);
  const data = [don];

  res.render("userportel.ejs", { don, data });
  console.log({ id, don });
  // console.log("/trust/userportal/",{userName},{ data });
});

// edit password ========================================
app.get("/trust/userportal/:id/edit/", async (req, res) => {
  let { id } = req.params;
  let don = await userdetail.findById(id);
  const data = [don];

  res.render("editpassword.ejs", { don, data });
  console.log("/trust/userportal/:id/edit/", { id, don, data });
  // console.log("/trust/userportal/",{userName},{ data });
});

// update password ========================================
app.put("/trust/userportal/:id/update/", async (req, res) => {
  let { id } = req.params;
  let { oldpassWord, newpassWord, renewpassWord } = req.body;
  let don = await userdetail.findById(id);

   const passWord = don.passWord;

  if (!oldpassWord) {
    console.log("please corect the passWord");
    res.render("editpassoldpasswrong.ejs", { don });
  }

  else if (oldpassWord !== passWord) {
    console.log("please corect the oldpassword");
    res.render("editpassoldpasswrong.ejs", { don });
  }
  else if (!newpassWord) {
    console.log("not empty newpassword");
    res.render("editpassrenewpasswrong .ejs", { don });
  }
  else if (!renewpassWord) {
    console.log("not empty renewpassword");
    res.render("editpassrenewpasswrong .ejs", { don });
  }

    else if (newpassWord !== renewpassWord) {
      console.log("please corect the re enter newpassword");
      res.render("editpassrenewpasswrong .ejs", { don });
    } 
    else {
      let updata = await userdetail.findByIdAndUpdate(id, {passWord:newpassWord });
      const data = [updata];
      console.log("welcom",data);
      res.render("userportel.ejs", { don });
      // console.log(don,data[0]);
    }

    //  console.log({id,oldpassWord},don.passWord);
    console.log(req.body, "/trust/userportal/:id/update/");
  }
);

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

//login usernam list=============================================
app.get("/trust/username", (req, res) => {
  // let { username } = req.query;
  // let don = donor.find((donor) => username === donor.username);
  res.render("login.ejs");
  console.log("/trust/username");
});

// user loging request ========================================
app.get("/trust/new", (req, res) => {
  res.render("alert&signup.ejs");
  // }

  console.log("/trust/new");
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

// SERCH profile  by username =============================================
app.post("/trust/user/:id/profile/", async (req, res) => {
  // let data = req.params;
  let { id } = req.params;
  let don = await userdetail.findById(id);
  const data = [don];

  if (!don) {
    res.render("searchformalert.ejs", { don });
  } else {
    res.render("useraccount.ejs", { data, don });
  }

  console.log(id, don, data);

  // res.send(don);
});
// SERCH contribution  by username =============================================
app.post("/trust/user/:userName/contribution", async (req, res) => {
  // let data = req.params;
  let { userName } = req.params;
  let don = await user1.find({ userName: userName });
  const data = don[0];
  if (data) {
    res.render("usercontribution.ejs", { don });
  } else {
    res.render("searchformalert.ejs", { don });
  }

  console.log(userName, data, "/trust/user/:userName/contribution");

  // res.send(don);
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
