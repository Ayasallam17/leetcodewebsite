module.exports = (sequelize , Sequelize) =>{
    const Solution = sequelize.define('solution' , {
        id:{
            type:Sequelize.INTEGER,
            autoIncrement: true,
            allowNull :false,
            primaryKey : true,
        },
        code:{
            type:Sequelize.STRING(700),
            allownull:false,
        },
    })
    return Solution
}