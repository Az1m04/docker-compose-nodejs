const router = require('express').Router()
const createUser= require("../controller/user/createUser")
const getUser= require("../controller/user/getUser")
const updateUser= require("../controller/user/updateUser")
const loginUser = require('../controller/user/login')

router.post('/create',createUser)

router.get('/get/:id',getUser)

router.post('/login',loginUser)

router.put('/update/:id',updateUser)


module.exports=router
