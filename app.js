const express = require('express');
const bodyParser = require('body-parser');
// using my module date
const date= require(__dirname+'/date.js');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

let itemz=['Buy Food','Cook Food','Eat Food'];
let workItems=[];


app.get('/', function(req, res) {
  let day=date.getDate();
  
   res.render("list", { listTitle: day, newListItem:itemz });
});


app.post('/',function(req,res){
   let item= req.body.newItem;
   

  if(req.body.list === "work"){
    workItems.push(item);
    res.redirect('/work');
  }else{
     itemz.push(item);
     res.redirect('/');

  }
  
});  


app.get('/work',function(req,res){
  res.render('list',{listTitle: 'work List',newListItem:workItems});
});


app.post('/work',function(req,res){
  let item =req.body.newItem;
  workItems.push(item);
  res.redirect('/work');
});


app.listen(3000, function() {
  console.log('server started on port 3000');
});