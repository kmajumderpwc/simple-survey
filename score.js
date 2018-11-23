var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
app.use(bodyParser.json())
var path = require ('path');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "35.231.188.219",
  user: "root",
  password: "Pa$$word@1234",
  database: "survey"
});



app.get('/getScore', function (req, res) {
  fs.readFile('index.html', function (err, data) {
    res.write(data);
    res.end();
  });
})

app.get('/nextPage', function(req,res){
  fs.readFile('secondPage.html', function (err, data) {
     res.write(data);
     res.send();
  });
})

app.get('/FirstPage.html', function(req,res){
  fs.readFile('FirstPage.html', function (err, data) {
     res.write(data);
     res.send();
  });
})
app.get('/privacy.html', function(req,res){
  fs.readFile('privacy.html', function (err, data) {
     res.write(data);
     res.send();
  });
})

app.get('/lastPage', function(req,res){
  fs.readFile('thirdPage.html', function (err, data) {
     res.write(data);
     res.send();
  });
})

app.post('/saveData',function(req,res){
  //console.log("req is ::",req)
  var username = req.query.username;
  var email = req.query.email;
  var organization = req.query.organization;
  var mobile = req.query.mobile;
  console.log("username is ",username);
  console.log("email is ",email);
  console.log("organization is ",organization);
  console.log("mobile is ",mobile);
 // the code work start here

//   con.connect(function(err){
//     console.log("connection is successfull");
//     var insertSql = "INSERT into user (name,email,org,mobile) VALUES(?,?,?,?) ";
//      con.query(insertSql ,[username,email,organization,mobile], function(err,rows){
//          if (!err) {  
//              res.json(rows);  
//          }  
//          else {  
//              res.json(err);  
//          }  
        
//      })
//  });

// the code work fine end

/// start of testing code
con.connect(function(err){
  console.log("connection is successfull");
  var insertSql = "INSERT into user (name,email,org,mobile) VALUES(?,?,?,?) ";
   con.query(insertSql ,[username,email,organization,mobile], function(err,rows){
       if (!err) {  
           //res.json(rows);  
           res.status(200).json("true");
       }  
       else {  
           res.json(err);  
       }  
      
   })
});

/// end of testing code
  //res.send();
});

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.text({type:['text/xml', 'application/xml', 'text/html']}));
app.use(bodyParser.json({type:['application/json']}));


app.listen(8080, () => {
  console.log('App running..')
  console.log('Visit localhost:8080/getScore')
})
