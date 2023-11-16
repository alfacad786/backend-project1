
let body =document.querySelector("body");
let userinput= document.getElementById("userinput");
let nameinput=document.getElementById("nameinput");
let h3 =document.querySelector("h3");
let btn = document.getElementById("btnback");



function back(params)  {
      return ( location="/donor/username?") ;
};

btn.addEventListener("click",back);



