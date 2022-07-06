
const jwt = require("jsonwebtoken");
const config = require("../config/secret.config");
const { role } = require("../models");


const db  = require("../models");
const User = db.user;
/**
 * Logic to validate the access token
 */

verifyToken =(req,res,next)=>{
    //read the token from the header 
    var token = req.headers['x-access-token']; // provide by the client


    if(!token){
        return res.status(403).send({
            message:"No token provided"
        });
        return;
    }
    //check the validity of the token
   jwt.verify(token,config.secret,(err,decodedToken)=>{
       if(err){
           res.status(401).send({
               message:"unauthorized"
           });
           return;
       }
       req.userId = decodedToken.id;//reading the user id from token and setting it in req object
        next();
   })
}
isAdmin = (req,res,next)=>{
    // In the prevous midleware we got the user id

    // using that user id I will fetch the user object from db and check the user type
    User.findByPk(req.userId).then(user =>{
        user.getRoles().then(roles =>{
            
            for(let i=0;i<roles.length;i++){
                if(roles[i].name =='admin'){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message:"requires admin role"
            });
            return;
        })
    })
}



const authJwt ={
    verifyToken : verifyToken,
    isAdmin: isAdmin
}
module.exports = authJwt;