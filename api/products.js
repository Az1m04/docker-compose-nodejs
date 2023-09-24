const router = require('express').Router()
const createProducts= require("../controller/Products/createProducts")
const getProducts= require("../controller/Products/getProducts")

router.post('/create',createProducts)

router.get('/products',getProducts)


module.exports=router
