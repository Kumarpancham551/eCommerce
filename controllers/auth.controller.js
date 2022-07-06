/**
 * This controler file will be used for 
 * authenctication
 */
 const bcrypt = require("bcryptjs");
 const db = require("../models");
 
 const User = db.user;
 const Role = db.role;
 
 const Op = db.Sequelize.Op;
 const jwt = require("jsonwebtoken");
 const secretKey = require("../config/secret.config");
 /**
  * handler for signup
  */
 exports.signup =(req,res)=>{
     //Read the req body and create user object
 
     const userObj ={
         username : req.body.username,
         email: req.body.email,
         password: bcrypt.hashSync(req.body.password,8) //need to encrypt this
     }
     //persists this user object to the db
     User.create(userObj).then(user=>{
         console.log("user created");
 
         //I also need to provide correct roles to this
         if(req.body.roles){
             // I need dto first have the roles created in the system
             // I need to check if the desired roles match with the supported roles
               
             Role.findAll({
                 where : {
                     name:{
                         //where name = 1 or name = 2 or name =3
                         [Op.or] : req.body.roles  //array of roles
                     }
                 }
             }).then(roles =>{
                // set these roles with user
                user.setRoles(roles).then(()=>{
                    console.log("registration completed")
                    res.status(201).send({
                        message:"user successfully register"
                    })
                })
             })
 
         }else{
             /*
             // one option is that i fetch the role object by running the query
 
             Role.findOne({
                 where:{
                     name:'customer'
                 }
             }).then(roles =>{
                 User.setRoles([roles]).then(()=>{
                     console.log("registration completed")
                     res.status(201).send({
                         message:"user successfully register"
                     })
                 })
             })
             */
            user.setRoles([1]).then(()=>{
             console.log("registration completed")
             res.status(201).send({
                 message:"user successfully register"
             })
            })
 
         }
     }).catch(err =>{
         console.log("error while creating user",err.message);
         res.status(500).send({
             message: "Some internal error"
         })
     })
 }
 
 
 
 /**
  * Handler for signin
  */
 
 exports.signin = (req,res) =>{
     //check if the user exist?
 
     User.findOne({
         where:{
             email: req.body.email
         }
     }).then(user =>{
         if(!user){
             res.status(400).send({
                 message:"User Not Found"
             })
             return;
         }
         //verify the password
         var  passwordIsValid = bcrypt.compareSync(
             req.body.password,
             user.password
         );
         if(!passwordIsValid){
             res.status(401).send({
                 message:"Invalid Password"
             })
         
         }
         /**
          * Need to generate the access token
          */
         var token = jwt.sign({id:user.id}, secretKey.secret,{ //This again we have kept in the config file
             expiresIn:300 
         });
         // I want to provid the roles assigned to user in the response
 
         var authorities = [];
         user.getRoles().then(roles =>{
             for(i=0;i<roles.length;i++){
                 authorities.push("ROLE_"+roles[i].name.toUpperCase());
             }
             res.status(200).send({
                 id: user.id,
                 username:user.username,
                 email: user.email,
                 roles: authorities,
                 accessToken : token
             });
         });
         
 
     }).catch(err =>{
         res.status(500).send({
             message: "Internal error while signin"
         });
     })
 }