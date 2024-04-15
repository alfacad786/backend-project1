require("dotenv").config();
const { ejs } = require("ejs");
const express = require("express");

const app = express();
const userdetail = require("../models/userdetail.js");
const user1 = require("../models/addpayment.js");
const admindetail = require("../models/admindetail.js");
const router = express.Router({ mergeParams: true });
const methodOverride = require("method-override");
const Razorpay = require("razorpay");
const bodyparser = require("body-parser");
app.use(require("body-parser").json);
const key_id = process.env.key_id;
const key_secret = process.env.key_secret;
const emailApiToken = process.env.emailApiToken;
const EmailParams = require("mailersend").EmailParams;
const Sender = require("mailersend");

const { MailerSend, Recipient } = require('mailersend');
const mailersend = new MailerSend({ api_key: emailApiToken });
// import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
// let body =document.querySelector("body");
//=======================================================
//=======================================================
//=======================================================

// ======add new user in userdetals REQUEST======
router.post("/addnewuser/", async (req, res) => {
  // let username = req.params.p.i
  let { userName, password, name, city, area, mobile, email } = req.body;
  let chekuser = await userdetail.findOne({ userName: userName });
  // let chekadmin = await admindetail.findOne({ userName: userName });
  if (!chekuser) {
    const newUserdetail = new userdetail({
      userName: userName,
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

    console.log(" add data");
    res.redirect("/trust/user/logpage/");
    // console.log(" data match");
  } else {
    res.render("errer userrejistration.ejs");
    console.log(" match the userName");
    console.log(userName, chekuser);
    // res.render("loginerror.ejs");
  }
});

// USER ADD payment by razolpay  DATA member REQUEST======================

router.post("/:id/addpay", async (req, res) => {
  let { id } = req.params;
  let { userName, userId, name, payment, date, contect, email } = req.body;
  let don = await userdetail.findOne({ userName: userName });
  // ---------------------razolpay payment code start--------------

  //  console.log(key_id, payment);
  var instance = new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
  });
  var option = {
    amount: payment*100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  instance.orders.create(option, function (err, order) {   
    res.render("checkout.ejs", { orderId: order.id ,key_id:key_id, amount: payment,name:name,email:email,contect:contect ,don});
    console.log(order, "o-id",order.id);
  });
  // ---------------------razolpay payment code end--------------

  //================================================

  //================================================
  // ---------------------database save payment code start--------------
  // donor.push({ userName, name, payment, date });
  // let don = await userdetail.findOne({ userName: userName });
  // const data = don[0];
  console.log("--payment add request--");
  const newuser1 = new user1({
    userName: userName,
    userId: userId,
    name: name,
    payment: payment,
    date: date,
  });
  newuser1
    .save()
    .then((res) => {
      console.log("res", res, "res");

      // --------------------send email------------------------

      // --------------------------------------------
    })
    .catch((err) => {
      console.log("err", err, "err");
    });
  // const mailersend = new MailerSend({
  //   api_key: emailApiToken,
  // });
  // const sentFrom = new Sender("alfa_cad786@yahoo.com", "asifiqbal");
  // const recipients = [new Recipient(email, name)];
  // const emailParams = new EmailParams()
  //   .setFrom(sentFrom)
  //   .setTo(recipients)
  //   .setReplyTo(sentFrom)
  //   .setSubject("This is a Subject")
  //   .setHtml("<strong>This is the HTML content</strong>")
  //   .setText("This is the text content");
  //   await mailersend.send(emailParams);
  // console.log(emailParams);
  // res.render("user-add.ejs", { userName, id, don });

  console.log("new", id, req.body, userName);
  // ---------------------database save payment code end--------------
});

//=======================================================
//=======================================================
//=======================================================

// user registration page request ========================================
router.get("/Registration/", (req, res) => {
  console.log("--Registration page request--");
  res.render("alert&signup.ejs");
  console.log("/trust/new");
});

//loginpage=================================
router.get("/logpage/", (req, res) => {
  // let { username } = req.query;
  console.log("--loginpage request--");
  // let don = donor.find((donor) => username === donor.username);
  res.render("login.ejs");
  console.log("/trust/user/logpage/");
});

// loging userportal request ========================================
router.post("/loging/", async (req, res) => {
  let { userName, passWord } = req.body;
  // let usernam=req.params
  // let don = await userdetail.findOne({ userName: userName });
  console.log("--userportal request--");
  let don = await userdetail.findOne({
    userName: userName,
    passWord: passWord,
  });
  // let data = don[0];
  // ========================================================
  let don1 = await userdetail.findOne({ userName: userName });
  let don2 = await userdetail.findOne({ passWord: passWord });
  if (!don1) {
    console.log("please corect the userName");
  }
  if (!don2) {
    console.log("please corect the passWord");
  }
  // ========================================================

  if (!don) {
    console.log("please corect the userName");
    res.render("loginerror.ejs");
  }
  // else if (don.passWord !== passWord) {
  //   console.log("please corect the password");
  //   res.render("loginerror.ejs");
  // }
  else {

// --------------------------------------------


// const recipients = [new Recipient(don.email, don.name)];

// const personalization = [
//   {
//     email: don.email,
//     data: {
//       name: don.name
//     },
//   }
// ];
// const emailParams = new EmailParams()
// emailParams.setFrom("info@domain.com")
// emailParams.setFromName("Your Name")
// emailParams.setRecipients(recipients)
// emailParams.setSubject("Subject")
// emailParams.setTemplateId('k68zxl22dv3lj905')
// emailParams.setPersonalization(personalization);

// mailersend.send(emailParams);
// ------------------------------------
    console.log("welcom");
    res.render("userportel.ejs", { don });
    console.log(userName, passWord, don.name);
  }
  console.log(don.email, userName);
});
// back userportal request ========================================

router.post("/back/:id/", async (req, res) => {
  let { id } = req.params;
  let don = await userdetail.findById(id);
  const data = [don];
  console.log("--back request--");

  res.render("userportel.ejs", { id, don, data });
  console.log({ id, don, data });
  // console.log("/trust/userportal/",{userName},{ data });
});
//payment add request ========================================
router.post("/add/:userName/", async (req, res) => {
  let { userName } = req.params;
  let don = await userdetail.findOne({ userName: userName });
  // const data = don[0];
  console.log("-- addpayment button request--");
  if (don) {
    res.render("user-add.ejs", { don });
    console.log(don);
  } else {
    res.render("alert&signup.ejs", { don });
  }

  console.log(don, userName);

  // res.send(don);
});

// edit password ========================================
router.get("/:id/edit/", async (req, res) => {
  let { id } = req.params;
  let don = await userdetail.findById(id);
  const data = [don];
  console.log("--Change Password button request--");

  res.render("editpassword.ejs", { don, data });
  console.log("/trust/user/:id/edit/", { id, don, data });
  // console.log("/trust/userportal/",{userName},{ data });
});

// update password ========================================
router.put("/:id/update/", async (req, res) => {
  let { id } = req.params;
  let { oldpassWord, newpassWord, renewpassWord } = req.body;
  let don = await userdetail.findById(id);
  console.log("--update password request--");
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

// SERCH profile  by username =============================================
router.post("/:id/profile/", async (req, res) => {
  console.log("--profile searsh request--");
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
router.post("/:id/contribution", async (req, res) => {
  console.log("--contribution request--");
  // let data = req.params;

  let { id } = req.params;
  let don = await userdetail.findById(id);
  let don1 = await user1.find({ userId: id });
  const data = don1[0];
  if (!don) {
    res.render("searchformalert.ejs", { data, don1 });
  } else {
    res.render("usercontribution.ejs", { id, data, don1, don });
  }
  console.log(id, data, don, "/trust/user/:id/contribution");

  // res.send(don);
});

//==============================================
//===================router export==============
//==============================================
module.exports = router;
//==============================================
//==============================================
