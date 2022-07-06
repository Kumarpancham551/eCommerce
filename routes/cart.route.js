
const {authJwt} = require("../middleware");
const cartController = require("../controllers/cart.controller");

module.exports =(app)=>{
//Route for creating the cart
app.post("/ecom/api/v1/carts",[authJwt.verifyToken],cartController.create);

app.put("/ecom/api/v1/carts/:id",[authJwt.verifyToken],cartController.update);

//Route for getting cart
app.get("/ecom/api/v1/carts/:id",[authJwt.verifyToken],cartController.getCart);
}