//const { cart } = require("../models");
const db = require("../models");
const Cart = db.cart;
const Product = db.product;

// Handler for creating the cart request

exports.create=(req,res)=>{
    const cart ={
        userId: req.userId
    };

    //If the user has also provided the item ids while creating cart
     //const itemId = req.body.items;
     
     Cart.create(cart).then(cart=>{
         res.status(201).send(cart)
     }).catch(err=>{
         res.status(500).send({
             message: "Some Internal Error Happened"
         })
     })
}


/**
 * Handler for updating the cart
 * 
 * 127.0.0.1:8080/eCom/v1/api/carts/123
 */
exports.update = (req,res)=>{
    //Figure out of the cart if  it's present, which needs to be updated
    const cartId = req.params.id;

    Cart.findByPk(cartId).then(cart =>{
    //Add the products passed in the request body to the cart

    var productIds = req.body.productIds;
    Product.findAll({
        where:{
            id:productIds
        }
    }).then(products =>{
        if(!products){
            res.status(400).send({
                message:"Products trying to add doesn't exist"
            });
            return;
        }
        //Set these products inside the cart
        cart.setProducts(products).then(()=>{
            console.log("products successfully added to the cart")
            //Take care of cost part
            var cost = 0;
            var productsSelected = [];
            cart.getProducts().then(cartProducts =>{
                for(i=0;i<cartProducts.length;i++){
                    productsSelected.push({
                        id:cartProducts[i].id,
                        name:cartProducts[i].name,
                        cost:cartProducts[i].cost,
                    
                    })
                    cost = cost + cartProducts[i].cost;

                }
                //I am ready to return the cart update respons
                res.status(200).send({
                    id: cart.id,
                    productsAdded: productsSelected,
                    cost :cost
                })
               
            })
        })
    })

    }).catch(err=>{
        res.status(500).send({
            message:"Error while updating the cart"
        })
    })
}


/**
 * Search for a cart based on the cardt id
 */

exports.getCart = (req,res)=>{
    const cartId = req.params.id;
    Cart.findByPk(cartId).then(cart =>{
        var cost = 0;
        var productsSelected = [];
        cart.getProducts().then(cartProducts =>{
            for(i=0;i<cartProducts.length;i++){
                productsSelected.push({
                    id:cartProducts[i].id,
                    name:cartProducts[i].name,
                    cost:cartProducts[i].cost,
                
                });
                cost = cost + cartProducts[i].cost;

            }
            //I am ready to return the cart update respons
            res.status(200).send({
                id: cart.id,
                productsAdded: productsSelected,
                cost :cost
            })
           
        })
    })
}
      