const jwt = require('jsonwebtoken');
const User = require("../models/users");
const {response} = require("../util/response")

async function checkAuth(req,res,next){
    try{
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        if(req.headers.authorization){
            const token = jwt.verify(req.headers.authorization, jwtSecretKey);
            if(token){
                let user = await User.findOne({_id:token.userId});
                if(user)
                    req.userId = user._id
                else
                    return res.json(response(false,null,"User not found"));
            }else{
                return res.json(response(false,null,"Invalid auth token"));
            }
           
        }else{
            return res.json(response(false,null,"Invalid auth token"));
        }
        next();

    }catch(error){
        console.log("error",error)
        return res.json(response(false,null,"Something went wrong"));
    }
}

module.exports = {checkAuth}