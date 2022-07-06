/**
 * This is the controller class for the product resources
 * 
 * /
 
 /**
 * Handler for  creating products 
 */ 
  const model = require("../models"); // index.js is called automatically
  const Product = model.product;
  exports.create =(req,res)=>{
      /**
       * get the req body
       */
  
      const prod ={
          name : req.body.name,
          description : req.body.description,
          cost : req.body.cost,
          categoryId:req.body.categoryId
      }
  // store this product in db
  Product.create(prod).then(product=>{
      console.log("product added in the database with name", prod.name);
      res.status(201).send(product);
  }).catch(err=>{
      console.log("error while adding product ", prod.name);
      res.status(500).send({
          message:"some internal error happened"
      })
  })
  
  
  }
  
   /**
   * Handler for get all products
   */
  
  exports.findAll=(req,res)=>{
  
      const productName = req.query.name;
      var promise;
      if(productName){
          promise = Product.findAll({
              where:{
                  name:productName
              }
          });
      }else{
          promise = Product.findAll();
      }
      promise.then(products=>{
          res.status(200).send(products);
      }).catch(err=>{
          res.status(500).send({
              message:"some internal error happened"
          })
      })
  }
  
   /**
    * Handler for get products based on product id
    * 
    * /ecom/v1/api/product/123
    */
    exports.findOne =(req,res)=>{
        const productId = req.params.id;
  
        Product.findByPk(productId).then(product=>{
            res.status(200).send(product);
        }).catch(err=>{
          res.status(500).send({
              message:"some internal error happened"
          })
         // console.log(err);
      })
    }
  
   /**
    * Handler for updating the product
    */
   exports.update =(req,res)=>{
       const product ={
           name:req.body.name,
           description:req.body.description,
           cost: req.body.cost
       }
       const productId = req.params.id;
       /**
        * update the product
        */
  Product.update(
      product, {
          returning:true,
          where:{
              id:productId
          }
      }
  ).then(updateProduct=>{
  
      /**
       * I need to fetch the updated deata
       */
       Product.findByPk(productId).then(product=>{
          res.status(200).send(product);
      }).catch(err=>{
        res.status(500).send({
            message:"some internal error happened"
        })
       
    })
  
  }).catch(err=>{
      res.status(500).send({
          message:"some internal error happened"
      })
  })
  
   }
   /**
    * Handler for deleting the product
    */
  
   exports.delete = (req,res)=>{
       const productId = req.params.id;
  
       Product.destroy({
           where:{
               id:productId
           }
       }).then(result=>{
       res.status(200).send({
           message:"deleted"
       })
       }).catch(err=>{
          res.status(500).send({
              message:"some internal error happened"
          })
      })
   }