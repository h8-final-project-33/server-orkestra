const jwt = require('../helpers/jwt')
const axios = require('axios')
const url   = `http://localhost:3001/images/`
function authentication(req,res,next){
    try {
        let decoded = jwt.verifyToken(req.headers.token);
        req.decoded = decoded
        next()
      } catch(err) {
        next(err)
      }
}


function authorization(req,res,next){
    axios.get(`${url}${req.params.id}`)
    .then(({ data }) => {
        if (data) {
          if (data.owner == req.decoded._id) {
            next()
          }
          else {
            res.status(401).json({message: 'Unauthorized User'})
          } 
        }
        else {
          res.status(404).json({message: 'not found'})
        }
    })
    .catch(err =>  next(err))
    
    

}

module.exports = {
    authentication,
    authorization
}