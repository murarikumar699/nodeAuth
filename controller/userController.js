const User = require('../models/users');
const {response} = require("../util/response")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const {validate} = require("../util/validation")
const message = require("../util/message.json");
const saltRounds = 10

async function signUp(req,res){
    try{
        let isValidate = validate(req.body,['firstName','lastName','email','password','state']);
        if(!isValidate)
            return res.status(401).json(response(false,null,message.requiredFields))

        let user = await User.countDocuments({email:req.body.email})
        if(user > 0)
            return res.status(401).json(response(false,null,message.emailAlreadyTaken));

            let password =  await bcrypt.genSalt(saltRounds)
            .then(salt => {
                return bcrypt.hash(req.body.password, salt)
            })
            .then(hash => {
                return hash
            })
            await User.create({
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        email:req.body.email,
                        password:password,
                        state:req.body.state
                    })
    return res.json(response(true,[],message.signUpSuccessfully));
    }catch(error){
        console.log("error",error)
        return res.status(401).json(response(false,null,null));
    }
}

async function login(req,res){
    try{
        let user = await User.findOne({email:req.body.email})
        if(!user)
            return res.status(401).json(response(false,null,message.invalidEmail));

        let isValid = await bcrypt.compare(req.body.password, user.password)
        if(!isValid)
        return res.status(401).json(response(false,null,message.invalidEmailOrPassword));

        let jwtSecretKey = process.env.JWT_SECRET_KEY; 
        let data = {
            userId: user._id,
        } 
        const token = jwt.sign(data, jwtSecretKey);
        
        return res.json(response(true,{user:user,token:token},message.success));
    }catch(error){
        console.log("error",error)
        return res.status(401).json(response(false,null,message.error));
    }
}

async function dashboard(req,res){
    try{
        return res.json(response(true,[],message.welcome));
    }catch(error){
        console.log(error);
        return res.status(401).json(response(false,null,null));
    }
}



module.exports = {
    login,
    signUp,
    dashboard
}