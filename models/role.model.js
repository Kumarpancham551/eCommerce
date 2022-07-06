module.exports = (sequelize, Sequlize) =>{
    const Role  = sequelize.define("roles",{
        id:{
            type: Sequlize.INTEGER,
            primaryKey: true
        },
        name:{
            type:Sequlize.STRING
        }

    });
    return Role;
}