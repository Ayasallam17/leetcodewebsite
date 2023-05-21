module.exports = (sequelize , Sequelize) =>{
    const SolvedProblem = sequelize.define('solvedproblem' , {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull :false
        },
        status:{
            type:Sequelize.STRING(10),
            allownull:false,
        },
    })
    return SolvedProblem
}