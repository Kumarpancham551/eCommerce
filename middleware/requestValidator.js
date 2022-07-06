/**
 * This file will consists of middleware for validating the request body
 */
 const { category } = require("../models");
 /**
  * Validate the request body for categories
  */
 
 const validateCategoryRequest= (req,res,next)=>{
     /**
      * check for name
      */
     if(!req.body.name){
         res.status(400).send({
             message:"Name of the category is not provided"
         });
         return;
     }
     /**
      * check for the description
      */
     if(!req.body.description){
         res.status(400).send({
             message:"Description of the body is not provided"
         });
         return;
     }
     //Go to the controller
     next();
 }
 
 /**
  * validate for the product request body
  */
 const validateProductRequest=(req,res,next)=>{
 
     // check for the name
 
     if(!req.body.name){
         res.status(400).send({
             message:"Name of the product is not provided"
         });
         return;
     }
 
 
 
     /**
      * check for the description
      */
      if(!req.body.description){
         res.status(400).send({
             message:"Description of the body is not provided"
         });
         return;
     }
 //check for the cost
      if(!req.body.cost || req.body.cost<=0){
         res.status(400).send({
             message:"provide valid cost"
         });
         return;
     }
 
 //validation for the category id
 
 if(req.body.categoryId){
 //check for valid value
 category.findByPk(req.body.categoryId).then(category=>{
     if(!category){
         res.status(400).send({
             message:"provide valid category id" 
 })
 return;
     }
     next();
 })
 }else{
     res.status(400).send({
         message:"provide valid category id"
     });
     return;
 }
 
 
 }
 
 
 
 
 
 module.exports={
     validateCategoryRequest : validateCategoryRequest,
     validateProductRequest : validateProductRequest
 }