/**
 * This file will contain schema defination for the category resorce
 * 
 * we would to export this schema to be called from other model
 */


 module.exports =(sequelize, Sequelize)=>{
    const Category = sequelize.define("category",{
        id:{
          type: Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
        },
        name:{
         type:  Sequelize.STRING,
         allowNull:false
        },
        description:{
             type: Sequelize.STRING
        }
    },{
       tableName:"categories"
    });
     return Category;
    }