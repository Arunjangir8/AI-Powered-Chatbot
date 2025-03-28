import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const port=3000;
const app=express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.send()
})

app.listen(port,()=>{
    console.log("running At 3000")
})