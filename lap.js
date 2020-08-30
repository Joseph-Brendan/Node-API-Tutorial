const express = require('express')
const router = express.Router()
const verify = require('./tokenVerification')

router.get('/', verify, (request, response) =>{
    response.json({me:'you'})
})
module.exports = router