const express = require("express");
const bodyParser = require("body-parser")
const z = require("zod");
const app = express();

const schema = z.array(z.number());
const schema2 = z.object({
    email: z.string(),
    password: z.string(),
    country: z.literal("IN").or(z.literal("US")),
    kidneys: z.array(z.number),
})

const port=3000;
app.use(bodyParser.json()); //express.json bodyparser.json

app.post("/health-checkup",(req,res)=>{
    const kidneys= req.body.kidneys;
    const response = schema.safeParse(kidneys);
    if(!response.success){
        res.status(411).json({
            msg:"input is invales"
        })
    }else{
        res.send({
            response
        })
    }
   // const kidneylength= kidneys.length;

    //res.send("you have "+ kidneylength + "kidneys");
})

app.use((err, req,res ,next)=>{
    res.status(500).send("an internal server eroor occured")
    next();
})



app.listen(port,()=>{
    console.log("listening to the port ")
})