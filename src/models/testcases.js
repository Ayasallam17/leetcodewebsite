module.exports = (sequelize , Sequelize) =>{
    const TestCase = sequelize.define('testcase' , {
        id:{
            type:Sequelize.INTEGER,
            autoIncrement: true,
            allowNull :false,
            primaryKey : true,
        },
        input:{
            type:Sequelize.STRING(200),
            allownull:false,
        },
        output:{
            type:Sequelize.STRING(200),
            allownull:false,
        },
        number:{
            type:Sequelize.INTEGER,
            allownull:false,
            }
    })
    return TestCase
}