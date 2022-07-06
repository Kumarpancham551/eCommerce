const express = require("express");
const serverConfig = require("./config/server.config")
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.json());
/**
 * table initialization
 */

const db = require("./models");

const Category = db.category;
const Product = db.product;
const Role  = db.role;

//setup the relationship between the tables

Category.hasMany(Product);

/**
 * create the table
 */
 db.sequelize.sync({force:true}).then(()=>{
    console.log("table dropped and recreated");
    init();
  }).catch(err=>{
      console.log(err.message);
  })

   /**
 * This function should be executed at the app startup
 */
function init(){
  /***
   * create some initial categories
   * Bulk insert in Sequlize
   */
  var categories =[
    {
      name:"Electronics",
      description:"This categories will contain all the electronic products"
    },
    {
      name:"Kitchen",
      description:"This categories will contain all the Kitchen products"
    }
  ];
  
  Category.bulkCreate(categories).then(()=>{
    console.log("categories are added");
  }).catch(err=>{
    console.log("Error  initialozing ithe categories products",err.message);
  })

  
/** 
 *  Create the roles
*/
Role.create({
  id:1,
  name:"customer"
}),
Role.create({
  id:2,
  name:"admin"
})
  

}
  

  //Initialize the routes

  require("./routes/category.route")(app);
  require("./routes/product.route")(app);
  require("./routes/auth.route")(app);
  require("./routes/cart.route")(app);
  

app.listen(serverConfig.PORT, ()=>{
    console.log("Application started on PORT ", serverConfig.PORT)
})