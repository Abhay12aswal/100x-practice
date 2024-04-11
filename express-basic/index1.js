const express = require("express");
const bodyParser = require("body-parser")
const app = express();

const port=3000;
app.use(bodyParser.json()); //express.json

var users= [{
    name:"jhon",
    kidneys:[{
        healthy: false
    }]
}];



app.get("/",(req,res)=>{
    const jhonkidneys = users[0].kidneys;
    console.log(jhonkidneys)
    const numberofkidneys = jhonkidneys.length;

    let numberofhealthykidneys=0;
    for(let i=0;i<jhonkidneys.length;i++){
        if(jhonkidneys[i].healthy){
            numberofhealthykidneys+=1;
        }
    }
    const numberofunhealthykidneys= numberofkidneys-numberofhealthykidneys;
    res.json({
        numberofkidneys,
        numberofhealthykidneys,
        numberofunhealthykidneys
    })
})

app.post("/",(req,res)=>{
    const ishealthy= req.body.ishealthy;
    users[0].kidneys.push({
        healthy: ishealthy
    })
    res.json({
        msg:"done!"
    })

})

app.put("/",(req,res)=>{
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true; 
    }
    res.json({
        msg:'done2'
    })
})

app.delete("/",(req,res)=>{

    if(isthereatleastoneunhelathykidney()){
        const newkidneys= [];
        for(let i=0;i<users[0].kidneys.length;i++){
            if(users[0].kidneys[i].healthy){
                newkidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys= newkidneys;
        res.json({msg:"delete"})
    } else{
        res.status(411).json({msg:"you have no bad kidney"})
    }

})

function isthereatleastoneunhelathykidney(){
    let atleastoneunhealthykidney=false;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            atleastoneunhealthykidney=true;
        }
    }
    return atleastoneunhealthykidney
}

app.listen(port,()=>{
    console.log(`example app listening on port ${port}`)
})