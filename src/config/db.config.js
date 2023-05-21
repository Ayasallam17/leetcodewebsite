const Sequelize = require('sequelize');
const env = require('./env')
const sequelize = new Sequelize(env.database , env.username , env.password , {
    host: env.host,
    dialect : env.dialect,
    pool:{
        max : env.pool.max,
        min: env.pool.min,
        idle :env.pool.idle,
        acquire:env.pool.acquire
    },
    define:{
        timestamps:false
    }
})

const db ={}
db.sequelize = sequelize
db.Sequelize = Sequelize 

db.user = require('../models/user')(sequelize , Sequelize)
db.problem = require('../models/problem')(sequelize , Sequelize)
db.solution = require('../models/solution')(sequelize , Sequelize)
db.solvedproblem = require('../models/solvedproblem')(sequelize , Sequelize)
db.testcases = require('../models/testcases')(sequelize , Sequelize)

db.user.hasMany(db.solvedproblem)
db.solvedproblem.belongsTo(db.user)

db.problem.hasMany(db.solvedproblem)
db.solvedproblem.belongsTo(db.problem)

db.problem.hasMany(db.testcases)
db.testcases.belongsTo(db.problem)

db.user.hasMany(db.solution)
db.solution.belongsTo(db.user)

db.problem.hasMany(db.solution)
db.solution.belongsTo(db.problem)
module.exports = db


