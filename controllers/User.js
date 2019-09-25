const axios = require('axios')
const jwt = require('../helpers/jwt')
const baseUrl = 'http://35.240.188.155/user'
class ControllerUser{
    static regsiter (req,res,next) {
        let {username,email,password, avatar, birthday, gender } = req.body
        axios.post(baseUrl+'/register',{username,email,password, avatar, birthday : new Date(birthday), gender})
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
        axios.get(baseUrl+'/leaderboard', {data: {numLimit: limit}} )
        .then(({data}) => {
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static addToHistory (req,res,next) {
        const {imageID, url} = req.body
        axios.patch(baseUrl+'/addHistory', {imageID:{url, imageID},  _id: req.decoded._id})
        .then(({data}) => {
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static editProfile (req,res,next) {
        const { username, email, password, avatar, birthday, gender } = req.body
        let bodyUpdate = {}
        if (username) bodyUpdate.username = username
        if (email) bodyUpdate.email = email
        if (password) bodyUpdate.password = password
        if (avatar) bodyUpdate.avatar = avatar
        if (birthday) bodyUpdate.birthday = birthday
        if (gender) bodyUpdate.gender = gender
	console.log('masuk sini')
        axios.patch(baseUrl+'/editProfile', {...req.body, _id:req.decoded._id})
        .then(({data}) => {
            return axios.get(baseUrl, ({data: {_id:req.decoded._id}}))
        })
	.then(({data}) => res.json(data))
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = ControllerUser
