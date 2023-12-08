const { ejs } = require("ejs");
const express = require("express");
const userdetail = require("../models/userdetail.js");
const user1 = require("../models/addpayment.js");
const router = express.Router({ mergeParams: true });
const methodOverride = require("method-override");
// user registration page request ========================================
router.get("/Registration/", (req, res) => {
      res.render("alert&signup.ejs");
      // }
    
      console.log("/trust/new");
    });
// ======add new registration user in userdetals REQUEST======
router.post("/addnewuser/", (req, res) => {
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

//loginpage=================================
router.get("/logpage/", (req, res) => {
      // let { username } = req.query;
      // let don = donor.find((donor) => username === donor.username);
      res.render("login.ejs");
      console.log("/trust/username");
    });

// loging userportal request ========================================
router.post("/loging/", async (req, res) => {
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

// edit password ========================================
router.get("/:id/edit/", async (req, res) => {
  let { id } = req.params;
  let don = await userdetail.findById(id);
  const data = [don];

  res.render("editpassword.ejs", { don, data });
  console.log("/trust/user/:id/edit/", { id, don, data });
  // console.log("/trust/userportal/",{userName},{ data });
});

// update password ========================================
router.put("/:id/update/", async (req, res) => {
  let { id } = req.params;
  let { oldpassWord, newpassWord, renewpassWord } = req.body;
  let don = await userdetail.findById(id);

  const passWord = don.passWord;

  if (!oldpassWord) {
    console.log("please corect the passWord");
    res.render("editpassoldpasswrong.ejs", { don });
  } else if (oldpassWord !== passWord) {
    console.log("please corect the oldpassword");
    res.render("editpassoldpasswrong.ejs", { don });
  } else if (!newpassWord) {
    console.log("not empty newpassword");
    res.render("editpassrenewpasswrong .ejs", { don });
  } else if (!renewpassWord) {
    console.log("not empty renewpassword");
    res.render("editpassrenewpasswrong .ejs", { don });
  } else if (newpassWord !== renewpassWord) {
    console.log("please corect the re enter newpassword");
    res.render("editpassrenewpasswrong .ejs", { don });
  } else {
    let updata = await userdetail.findByIdAndUpdate(id, {
      passWord: newpassWord,
    });
    const data = [updata];
    console.log("welcom", data);
    res.render("userportel.ejs", { don });
    // console.log(don,data[0]);
  }

  //  console.log({id,oldpassWord},don.passWord);
  console.log(req.body, "/trust/userportal/:id/update/");
});

// back userportal request ========================================

router.post("/back/:id/", async (req, res) => {
  let { id } = req.params;
  let don = await userdetail.findById(id);
  const data = [don];

  res.render("userportel.ejs", { don, data });
  console.log({ id, don });
  // console.log("/trust/userportal/",{userName},{ data });
});

// SERCH profile  by username =============================================
router.post("/:id/profile/", async (req, res) => {
  // let data = req.params;
  let { id } = req.params;
  let don = await userdetail.findById(id);
  const data = [don];

  if (!don) {
    res.render("searchformalert.ejs", { don });
  } else {
    res.render("useraccount.ejs", {data,don});
  }

  console.log(id, don, data);

  // res.send(don);
});

// SERCH contribution  by username =============================================
router.post("/:id/contribution", async (req, res) => {
  // let data = req.params;
  
  let { id } = req.params;
  let don = await user1.find({userId:id});
 
 
  if (!don) {
      res.render("searchformalert.ejs", {don});
   
  } else {
      res.render("usercontribution.ejs", {don});
  }

  console.log(id,don,  "/trust/user/:userName/contribution");

  // res.send(don);
});

//==============================================
//===================router export==============
//==============================================
module.exports = router;
//==============================================
//==============================================
