const db = require("../models");
const User = db.user;
const ROLES = db.ROLES;

/**
 * Validationfor the duplicate email or username
 */
const checkDuplicateUserNameorEmail = (req,res,next)=>{
    //check for the username 
    User.findOne({
        where:{
            username : req.body.username
        }
    }).then(user =>{
        if(user){
            res.status(400).send({
                message:"Failed !, username already exists"
            });
            return;
        }
        // If user is not already present , then also validate for emaail

         //check for the email

    User.findOne({
        where :{
            email:req.body.email
        }
    }).then(user =>{
        if(user){
            res.status(400).send({
                message:"Failed !, email already exists"
            });
            return;
        }
        //
        next();
    })

})
   
    
}



/**
 * verify for correct roles
 */
checkRolesExisted = (req,res,next)=>{
    if(req.body.roles){
        // I need to iterate through the roles provided by the customers and see if it's valid
        for(let i=0; i<req.body.roles.length;i++){
          // if the req.body.roles[i] is present in the allowed list of roles
          if(!ROLES.includes(req.body.roles[i])){
              res.status(400).send({
                  message: "failed ! doesnot exist " + req.body.roles[i]
              })
              return;
          }
      
        }
     
    
    }
    next();
}


/***
 * validate if the username and email is valid
 */

const verifySignUp={
    checkDuplicateUserNameorEmail: checkDuplicateUserNameorEmail,
    checkRolesExisted: checkRolesExisted  
}

module.exports = verifySignUp;