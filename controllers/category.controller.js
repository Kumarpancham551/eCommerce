/**
 * This file is the controller aka the waiter in the hotel
 * 
 * This file will have all the logic that is needed for the processing of request
 */

// Handler for creating a new category request
const db = require("../models");
const Category=db.category;

exports.create = (req,res)=>{
    /** 
     * Try to create the category object
     * 
     * fetching the data from the request body
     */
    const category = {
        name:req.body.name,
        description: req.body.description
    }

    //Store in the db

    Category.create(category).then(category=>{
        console.log(`category name:[${category.name}] got inserted in the db`);
        res.status(201).send(category);
    }).catch(err=>{
        console.log(`Issue in inserting the Category name: [${category.name}]. Error message: ${err.message}`);
        res.status(500).send({
            message:"Some internal error happen"
        })
    })
}



/**
 * Handler for getting all the categories
 */

 exports.findAll = (req, res)=>{
    //localhost:8080/ecom/api/v1/category/?name=electronics--Query params
  
    /**
     * path params : /ecom/api/v1/categories/123   123 path params
     * 
     * path params : /ecom/api/v1/categories?name =pancham query params(/ is optional)
     * 
     */
  
    /**
     * I need to intercept the query params and use it : ?name ="pancham"
     */
  const categoryName = req.query.name ; // will get pancham store in category name
  // If i get query params, which is name I should apply the name filter else no filter
  let promise;
  if(categoryName){
    promise =Category.findAll({
        where : {
            name : categoryName
        }
    });
  }else{
  
  promise = Category.findAll();
    
  }
    promise.then(categories=>{
        res.status(200).send(categories);
    }).catch(err=>{
        res.status(500).send({
            message: "Some internal error happend"
        })
    })
  }
  
  
/**
 * Handler for getting the categories based on the id
 * 127.0.0.1:8080/ecom/api/v1/categories/:id
 */
exports.findOne = (req,res)=>{
    const categoryId = req.params.id;

    Category.findByPk(categoryId).then(categoryId=>{
        res.status(200).send(categoryId);
    }).catch(err=>{
        res.status(500).send({
            message: "Some internal error happen"
        })
    })
}

/**
 * provide support for updating the category
 * 
 * 127.0.0.1:8080/ecom/api/v1/categories:id
 * 
 * JSON body
 */

 exports.update =(req,res)=>{
    /**
     * I need to parse the request body just like pOST
     */

     const category = {
        name:req.body.name,
        description: req.body.description
    }

/**
 * I need to know which category has to updated 
 */
 const categoryId = req.params.id;

 /**
  * Its time to update the category
  */
 Category.update(category,{
     where:{id : categoryId},
     returning : true
 }).then(updatedCategory =>{
     console.log(updatedCategory);
     //I need to return the updated category

     Category.findByPk(categoryId).then(categoryRes=>{
        res.status(200).send(categoryRes);
     }).catch(err=>{
        res.status(500).send({
            message:"some internal error happend"
        })
     })
     
 }).catch(err=>{
     res.status(500).send({
         message:"some internal error happend"
     })
 })
 
}

// Deleting the category

exports.delete = (req,res)=>{
    const categoryId = req.params.id;

    Category.destroy({
        where : {
            id: categoryId
        }
    }).then(result=>{
        res.status(200).send({
            message: "successfully deleted the message"
        })
    }).catch(err=>{
        res.status(500).send({
            message:"some internal error happend"
        })
    })
}

