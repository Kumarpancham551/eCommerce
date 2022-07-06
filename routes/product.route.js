
// This file will contain the REST URIs mapping with the controllers
const productController = require("../controllers/product.controller");
const { requestValidators,authJwt } = require("../middleware");

module.exports =(app)=>{
    //Route for creating a new product
   app.post("/ecom/api/v1/products", [authJwt.verifyToken,authJwt.isAdmin,requestValidators.validateProductRequest],productController.create);
    //Route for getting the list of all the products
    app.get("/ecom/api/v1/products"  , productController.findAll);

    // product based on id
    app.get("/ecom/api/v1/products/:id", productController.findOne);
    //update product
    app.put("/ecom/api/v1/products/:id",[authJwt.verifyToken,authJwt.isAdmin,requestValidators.validateProductRequest], productController.update);
    //Delete product
    app.delete("/ecom/api/v1/products/:id",[authJwt.verifyToken,authJwt.isAdmin,requestValidators.validateProductRequest], productController.delete);
    //support the query parameters
    /**
     * /econ/api/v1/products?name=123
     */
}