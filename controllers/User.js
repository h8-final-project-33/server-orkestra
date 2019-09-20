const axios = require('axios')
const jwt = require('../helpers/jwt')
const baseUrl = 'http://localhost:3001/user'
class ControllerUser{
    static regsiter (req,res,next) {
        let {username,email,password, avatar} = req.body
        axios.post(baseUrl+'/register',{username,email,password, avatar})
        .then(({data}) => {
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        }) 
    }

    static login (req, res, next) {
        const{email,password} = req.body
        axios.post(baseUrl+'/login',{email,password})
        .then(({data}) => {
            if(data.token){
                req.headers.token = data.token
            }
            res.json(data)
        })
        .catch(err=>{
            next(err)
        }) 
    }

    static dataUser (req,res,next) {
        axios.get(baseUrl, ({data: {_id:req.decoded._id}}))
        .then(({data}) => {
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })

    }

    static addScore (req,res,next) {
        const {getScore} = req.body
        axios.patch(baseUrl+'/addScore', {getScore, _id:req.decoded._id})
        .then(({data}) => {
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static addFavoriteVocab (req,res,next) {
        const {vocab} = req.body
        axios.patch(baseUrl+'/addVocab', {vocab, _id:req.decoded._id})
        .then(({data}) => {
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static getLeaderboard (req,res,next) {
        const {limit} = req.body
        console.log(limit);
        axios.get(baseUrl+'/leaderboard', {data: {numLimit: limit}} )
        .then(({data}) => {
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = ControllerUser