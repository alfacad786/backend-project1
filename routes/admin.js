const { ejs } = require("ejs");
const express = require("express");
const router = express.Router();
const admindetail = require("../models/admindetail.js");
const userdetail = require("../models/userdetail.js");
const user1 = require("../models/addpayment.js");

// =========new registration member REQUEST=======================================
router.post("/new", (req, res) => {
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
  res.redirect("/trust/admin/Registraion/");
  // console.log(req.body);
});
// new ADMIN registration Buttom request ========================================

router.get("/Registraion/", (req, res) => {
  res.render("adminRegistration.ejs");
  // }

  console.log("/trust/admin/Registraion/");
});

// PRESS ADMINLOGIN BUTTON   ========================================
router.get("/logpage/", (req, res) => {
  // let { username } = req.query;
  // let don = donor.find((donor) => username === donor.username);
  res.render("adminlogin.ejs");
  console.log("/trust/admin/log/");
});

// ADMIN LOGIN request ========================================
router.get("/log/porter/", async (req, res) => {
  let { userName } = req.query;
  let { passWord } = req.query;

  let don = await admindetail.findOne({ userName: userName, passWord:passWord });
  // const data = don[0];
  
  // ========================================================
  let don1 = await admindetail.findOne({ userName: userName });
  let don2 = await admindetail.findOne({ passWord: passWord });
  if (!don1) {
    console.log("please corect the userName");
  }
  if (!don2) {
    console.log("please corect the passWord");
  }
  // ========================================================


  if (don) {
    res.render("adminportel.ejs", { don });
  } else { console.log("wrong pass");
    res.render("adminloginerror.ejs", { don });
  }
  // res.render("userportel.ejs",{ data });
  console.log(userName, don,"passWord is:", passWord);
  // console.log("/trust/userportal/",{userName},{ data });
});

// SERCH profile  by Admin =============================================

router.post("/:userName/profile/", async (req, res) => {
  // let data = req.params;
  // let { id } = req.params;
  // let don = await admindetail.findById(id);
  // const data = [don];
  let { userName } = req.params;
  let don = await admindetail.findOne({ userName: userName });
  const data = [don]

  if (!don) {
    res.render("adminsearchformalert.ejs", { don,data });
  } else {
    res.render("adminProfile.ejs", { data,don });
  }

  console.log("don="+ don,"data=", data);

  // res.send(don);
});
// back userportal request ========================================

router.post("/back/:userName/", async (req, res) => {
  // let { id } = req.params;
  // let don = await admindetail.findById(id);
  // const data = [don];
  let { userName } = req.params;
  let don = await admindetail.findOne({ userName: userName });
  const data = [don];

  res.render("adminportel.ejs", { don, data });
  console.log({  don });
  // console.log("/trust/userportal/",{userName},{ data });
});
// search data  request ========================================
router.post("/:userName/search/", async (req, res) => {
  let search = req.body.search;
  let Adminlist = { search: "Adminlist" };
  let userlist = { search: "userlist" };
  let { value } = req.params;
  // let { id } = req.params;
  // let don = await admindetail.findById(id);
  let { userName } = req.params;
  let don = await admindetail.findOne({ userName: userName });
  const data = [don];
  let admin = await admindetail.find();
  let alluser = await userdetail.find();
  let fund = await user1.find();

  if (search === "Adminlist") {
    console.log("adminlist");
    res.render("adminlist.ejs", {don,data, admin });
  } else if (search === "userlist") {
    res.render("admin-userlist copy.ejs", {fund, alluser, don });
  } else if (search === "totalpayment") {
    res.render("adminfund copy.ejs", { fund, don });
    console.log("totalpayment", fund, don);
    // res.render("searchformalert.ejs", { don });
  }

  console.log("admin :",don,admin);
});


// delet userprofile and relative doc data  request ========================================
router.delete("/user/:id/:userName/", async (req, res) => {

  let { userName } = req.params;
  let don = await admindetail.findOne({ userName: userName });
  //-----------------------------------------------------
  let { id } = req.params; 
  let mainuser = await userdetail.findById(id);
  let  userId  = mainuser._id;   
  let user = await user1.find({ userId : id  });
  for (let i = 0 ; i < user.length; i++) {
    let user = await user1.findOneAndDelete ({ userId : id  });
   
    console.log(user, "ok delet");
  }
  let deletuser = await userdetail.findByIdAndDelete(id); 
  let alluser = await userdetail.find(); 

  res.render("admin-userlist copy.ejs", {don,alluser, don });

  console.log("userName=",userName,"don=",don,"id=",id,"deletuser=",deletuser,"userId=",userId,"alluser=",alluser,  "delet");
});

// delet user donetion data  request ========================================
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  
  let delet = await user1.findByIdAndDelete(id);
  let  userId  = delet.userId
  let don = await admindetail.findOne({ userId:admindetail._id  });
  let fund = await user1.find();
  // res.redirect("/back/:id/");
  res.render("adminfund copy.ejs", { fund, don });

  console.log(id,don,delet,userId, "delet");
});


//==============================================
//===================router export==============
//==============================================
module.exports = router;
//==============================================
//==============================================
