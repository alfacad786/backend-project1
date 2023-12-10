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
  res.redirect("/Registraion/");
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
  // let usernam = req.params;

  let don = await admindetail.findOne({ userName: userName });
  // const data = don[0];
  if (don) {
    res.render("adminportel.ejs", { don });
  } else {
    res.render("adminloginerror.ejs", { don });
  }
  // res.render("userportel.ejs",{ data });
  console.log(userName, don);
  // console.log("/trust/userportal/",{userName},{ data });
});

// SERCH profile  by Admin =============================================

router.post("/:id/profile/", async (req, res) => {
  // let data = req.params;
  let { id } = req.params;
  let don = await admindetail.findById(id);
  const data = [don];

  if (!don) {
    res.render("adminsearchformalert.ejs", { don });
  } else {
    res.render("adminProfile.ejs", { data, don });
  }

  console.log(id, don, data);

  // res.send(don);
});
// back userportal request ========================================

router.post("/back/:id/", async (req, res) => {
  let { id } = req.params;
  let don = await admindetail.findById(id);
  const data = [don];

  res.render("adminportel.ejs", {id, don, data });
  console.log({ id, don });
  // console.log("/trust/userportal/",{userName},{ data });
});
// search data  request ========================================
router.post("/:id/search/", async (req, res) => {
  let search = req.body.search;
  let Adminlist = { search: "Adminlist" };
  let userlist = { search: "userlist" };
  let { value } = req.params;
  let { id } = req.params;
  let don = await admindetail.findById(id);
  let admin = await admindetail.find();
  let user = await userdetail.find();
  let fund = await user1.find();

  if (search === "Adminlist") {
    console.log("adminlist");
    res.render("adminlist.ejs", { admin, don });
  } else if (search === "userlist") {
    res.render("admin-userlist copy.ejs", { user, don });
  } else if (search === "totalpayment") {
    res.render("adminfund copy.ejs", { fund, don });
    console.log("totalpayment", fund, don);
    // res.render("searchformalert.ejs", { don });
  }

  console.log(id,"admin :"+don);
});


// delet userprofile and relative doc data  request ========================================
router.delete("/user/:id", async (req, res) => {
  let { id } = req.params;
  let deletuser = await userdetail.findByIdAndDelete(id);
  let  userId  = deletuser._id;
  let user = await userdetail.find();
  // let deletfund = await user1.findByIdAndDelete(id);
  // let  userId  = delet.userId  
  let don = await user1.find ({ userId : id  });
  for (let i = 0; i < user1.length; i++) {
    let don = await user1.findOneAndDelete ({ userId : id  });
    console.log(don, "ok delet");
  }
  // let fund = await user1.find();
  // // res.redirect("/back/:id/");

  res.render("admin-userlist copy.ejs", { user, don });

  console.log(id,deletuser,userId,don,  "delet");
 
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
