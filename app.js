const express = require("express");
const app= express();


const port = process.env.PORT || 3000;

app.use(require("cors")()); // origenes cruzados

app.get("/",(req,res)=>{
    res.send(`<h1>hola usuario</h1>`)
    console.log("bienvenido al servidor de mantenimiento");
});

app.use("/user", require("./routes/users.js"));

app.listen(port, ()=>{
console.log(`el servidor esta escuchado en ${port}`);
});
