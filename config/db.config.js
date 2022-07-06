/**
 * This file will have db related configuration
 */

 module.exports ={
    HOST:"localhost",
    USER:"root",
    PASSWORD:"8873",
    DB:"ecom_db",
    dialect:"mysql",
    pool:{
        max:5,//maximum connection possible at any time
        min:0,
        acquire: 30000,// wait for 30000 ms before aborting a connection
        idle: 1000  //
    }
}