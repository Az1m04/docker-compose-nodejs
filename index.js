const express=require('express')
const app=express()
const http = require("http").Server(app)
const cors =require("cors")
const bodyparser=require("body-parser")
const  mongoose = require('mongoose')
const apiRoutes =require("./api/products")
const apiUserRoutes =require("./api/user")
const { database ,port } = require('./config/keys')
const swaggerDoc=require("swagger-ui-express")
const swaggerDocumation = require('./service/documentations')
 
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use("/documentations",swaggerDoc.serve,swaggerDoc.setup(swaggerDocumation))
app.use('/api',apiRoutes)
app.use('/api/user',apiUserRoutes)
app.get('/test', (req, res) => {
    res.send('App is working')
})




mongoose.connect(database,{
 useNewUrlParser:true,
 useUnifiedTopology:true
}
).then(()=>
{
    console.log("DB connected")
}).then(()=>{
    http.listen(port,()=>{
        console.log("server started " + `http://localhost:${port}`)
    })
}).catch((e)=>{console.log(e)})