module.exports = (sequelize , Sequelize) =>{
    const Problem = sequelize.define('problem' , {
        id:{
            type:Sequelize.INTEGER,
            autoIncrement: true,
            allowNull :false,
            primaryKey : true,
        },
        title:{
            type:Sequelize.STRING(15),
            allownull:false,
        },
        type:{
            type:Sequelize.STRING(10),
            allownull:false,
        },
        description:{
            type:Sequelize.STRING(150),
            allownull:false,
        },
    })
    return Problem
}