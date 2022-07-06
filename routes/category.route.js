/***
 * This file will be responsible for routing the requests to the correct controller method
 */

 const controller = require('../controllers/category.controller');

 const { requestValidators,authJwt } = require("../middleware");
 
 
 
 
 module.exports = function(app){
 //route for cretaing new category 
 app.post('/ecom/api/v1/categories',[authJwt.verifyToken,authJwt.isAdmin,requestValidators.validateCategoryRequest], controller.create);
 
 // Routew for getting al the categories
 
 app.get('/ecom/api/v1/categories', controller.findAll);
     
 //Route for getting the category based on the category id
 app.get('/ecom/api/v1/categories/:id', controller.findOne);
 
 
 //Route for updating the category
 app.put('/ecom/api/v1/categories/:id',[authJwt.verifyToken,authJwt.isAdmin,requestValidators.validateCategoryRequest], controller.update);
 
 //Route for deleting the category
 app.delete('/ecom/api/v1/categories/:id',[authJwt.verifyToken,authJwt.isAdmin,requestValidators.validateCategoryRequest], controller.delete);
 
 }


