const express = require('express')
const router = express.Router()
const Tweep = require('../model/Tweeps')
const {signupChecks, loginChecks} = require('../authValidation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/signup', async  (request, response ) =>{
    // check for format error
    const {error} = signupChecks(request.body)
    if(error) {
        return response.status(400).send(error.details[0].message)
    }

    // check if email has been used
    const existingEmail = await Tweep.findOne({email : request.body.email})
    if (existingEmail) {
        return response.status(400).send('Email already exists')
    }

    // salt and hash password
    const saltPassword = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(request.body.password, saltPassword)
    

    const tweep = new Tweep({
        userName:request.body.userName,
        email:request.body.email,
        password:hashedPassword
    })
    tweep.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
    
})



router.post('/login', async (request, response) =>{
    const {error} = loginChecks(request.body)
    if(error) {
        return response.status(400).send(error.details[0].message)
    }

    const appUser = await Tweep.findOne({email : request.body.email})
    if (!appUser) {
        return response.status(400).send('Cannot find email')
    }

    const correctPassword = await bcrypt.compare(request.body.password, appUser.password)
    if(!correctPassword) {
        return response.status(400).send('Incorrect password')
    }

    //const sessionToken = jwt.sign({_id:appUser.id}, process.env.MY_SECRET_TOKEN)
    //response.header('authentication-id', sessionToken).send(sessionToken)


    response.send('logged in successfully')
})





module.exports = router