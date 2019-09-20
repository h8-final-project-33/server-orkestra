const jwt = require('jsonwebtoken')
function generateToken(data){
    return jwt.sign(data, process.env.SECRET_JWT);
}

function verifyToken(token){
    return jwt.verify(token, process.env.SECRET_JWT);
}

module.exports = {
    generateToken,
    verifyToken
}