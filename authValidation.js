const joi = require('@hapi/joi')



const signupChecks = (data) =>{
    const validationSchema = joi.object({
        userName: joi.string().min(4).required(),
        email:joi.string().min(4).required().email(),
        password:joi.string().min(4).required()
    })
    return validationSchema.validate(data)
}

const loginChecks = (data) =>{
    const validationSchema = joi.object({
        email:joi.string().min(4).required().email(),
        password:joi.string().min(4).required()
    })
    return validationSchema.validate(data)
}

module.exports.signupChecks = signupChecks
module.exports.loginChecks = loginChecks
