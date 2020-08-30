const jwt = require('jsonwebtoken')

module.exports  = function (request, response, next){
    const token = request.header('authentication-id')
    if (!token){
        return response.status(401).send('Access Denied')
    }
    try{
        const verified = jwt.verify(token, process.env.MY_SECRET_TOKEN)
        request.appUser = verified
    }catch(error){
        response.status(400).send('Invalid token')
    }
}