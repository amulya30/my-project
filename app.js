
var express=require('express');
var app=express();
var PORT=process.env.PORT || 3000;

app.use('/Plots',express.static('Plots'));

app.listen(PORT,function(){

 console.log("server running on port 3000");

});

app.get("/resultEDA",function(req,res){
    res.sendFile(__dirname+"/mlwebapp.html");
});

app.all('/prediction',callName);
function callName(req,res)
{

    var spawn=require("child_process").spawn;
    var gender = req.query.passengerID;
    var genderArr = ["0","0"];

    if(gender.localeCompare("male")){
        genderArr[0] = "1";
    }
    else{
        genderArr[1] = "1";
    }
    var embarkedArr = ["0","0","0"];
    
    if(req.query.embarked.localeCompare('S')==0){
        embarkedArr[0] = "1";
    }
    else if(req.query.embarked.localeCompare("C")==0){
        embarkedArr[1] = "1";
    }
    else{
        embarkedArr[2] = "1";
    }
    console.log([req.query.passengerID,req.query.pclass,genderArr[0],genderArr[1],req.query.age,req.query.sibSp,req.query.parch,req.query.fare,embarkedArr[0],embarkedArr[1],embarkedArr[2]])
    var process=spawn('python',["./predict.py",req.query.passengerID,req.query.pclass,genderArr[0],genderArr[1],req.query.age,req.query.sibSp,req.query.parch,req.query.fare,embarkedArr[0],embarkedArr[1],embarkedArr[2]]);

    process.stdout.on('data',function(data){
        console.log(data.toString());
        res.send(data.toString());
    }); 
}