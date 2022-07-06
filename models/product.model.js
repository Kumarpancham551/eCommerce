/**
 * This file will contain the schema for products
 * 
 * 
 * product:
 * 
 * id
 * name
 * description
 * cost
 * 
 * I need to define the schema and export it to the files
 */


 module.exports = (sequelize,Sequelize)=>{
    const Product = sequelize.define("product",{
        id:{
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
              type: Sequelize.STRING,
              allowNull:false
        },
        description:{
            type: Sequelize.STRING,
            
        },
        cost:{
            type:Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Product;
}
