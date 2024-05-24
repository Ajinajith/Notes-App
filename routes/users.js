var express = require('express');
var router = express.Router();
var user = require("../models/users");
var task= require("../models/task")



router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/create", function (req, res, next) {
  console.log(req.body)

  try {
    console.log("Hi");
   console.log(user);
    user.Create_user(req.body, function (err, rows) {
      console.log("error")
      if (err) {
          
        throw err;
      } else {
      
        res.redirect("/");
      }
    });
  } catch (e) {
  } finally {
  }
});
router.get('/signin', function(req, res, next) {
  res.render('login');
});
router.post("/login", function (req, res, next) {
  try {
      user.Login_user(req.body.username, req.body.password, function (err, rows) {
          console.log("login");

          console.log(rows)
          if (err) {
              throw err;
          } else {
              if (rows.success) {
                  req.session.user = rows.user;
                   console.log(user)
                  console.log(req.session.user)
                  console.log("+++++++")

                  console.log(req.session.user.username)
                

                  res.render('home', {userdata:req.session.user.username});
              } else {
                  res.redirect("/login");
              }
          }
      });
  } catch (e) {
      console.error(e);
      res.redirect("/login");
  } finally {
  }
});
router.get('/studies', (req,res)=>{
    res.render('studies')
});
// router.get("/physics",function(req,res,next){
//   res.redirect("/")
// })
// router.post("/posting", function (req, res, next) {
//       console.log(req.body)
//       user.Login_note(req.body.username, req.body.password, function (err, rows) {
//         console.log("hii");

//         console.log(rows)
//       })
// })

router.post("/studiesposting", function (req, res, next) {
  console.log("hai")
  console.log(req.body)
  try {
    console.log("Hi Studyposting");
   console.log(user);
    task.Create_task(req.body, function (err, rows) {
      
      if (err) {
          
        throw err;
      } else {
      
        res.redirect("/users/studiesposting");
      }
    });
  } catch (e) {
  } finally {
  }
});

router.get('/studiesposting', (req, res) => {
  
  task.List_task(function (err, rows) 
  {
    console.log("rows :" ,rows.results)
    // const notes_array=rows.results
    // console.log("notesarray :" ,notes_array)
    // if (req.session.user) {
    //   res.render("list-task", { data: req.session.user.user_name });
    // } else {
    //   res.redirect("/users/signin");
    // }
  if (err) 
  {  //   res.json(err);
    throw err;
  }
  else 
  {  // res.json(rows);
      res.render('studies-list',{ notes: rows.results, userdata:req.session.user.username,data:req.session.user});
      
}
});
});

router.get('/:userid/mytask',(req,res)=>{
  const userid=req.params.userid;
  console.log(userid);
  user.List_task(userid,function (err, rows) 
  {
    // console.log("rows :" ,rows.results)
    
  if (err) 
  {  
    throw err;
  }
  else 
  {  
      res.render('my-studies-list',{ notes: rows, userdata:req.session.user.username});
     
}
});
})

module.exports = router;
