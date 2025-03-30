import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const port = 3000;
const prisma = new PrismaClient();
const app = express(); 

app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("Login.ejs");
});

app.post("/Home",async (req,res)=>{
    const userdeails=await prisma.user.findUnique({
        where : {email : req.body.givenemail , password : req.body.givenpass}
    })
    if (userdeails){
        console.log("Find")
        res.render("Home.ejs")
    }else{
        console.log("notfind")
        res.redirect("/")
    }
    
})

app.get("/Reg",(req,res)=>{
    res.render("Reg.ejs");
})

app.post("/submit", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await prisma.user.create({
            data: { name, email, password }
        });
        console.log("User Created:", { name, email });
    } catch (error) {
        console.error("Error:", error);
    }
    res.redirect("/");
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
