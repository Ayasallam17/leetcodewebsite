module.exports = (sequelize , Sequelize) =>{
    const User = sequelize.define('user' , {
        id:{
            type:Sequelize.INTEGER,
            autoIncrement: true,
            allowNull :false,
            primaryKey : true,
        },
        user_name:{
            type:Sequelize.STRING(20),
            allownull:false,
        },
        email:{
            type:Sequelize.STRING(50),
            allownull:false,
        },
        password:{
            type:Sequelize.STRING(200),
            allownull:false,
        },
        age:{
            type:Sequelize.INTEGER,
            allownull:true,
        }
    })
    return User
}