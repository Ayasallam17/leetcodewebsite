const compiler = require('compilex')
const db = require('../config/db.config')
const redis = require('redis');
const PORT = "127.0.0.1"
const HOST = "6379"
const client = redis.createClient();
client.on('connect' , function(){
            console.log("yeess") // tip
        } )
     client.connect();
const User = db.user
const Problem = db.problem
const TestCase = db.testcases
const Solution = db.solution
const SolvedProblem = db.solvedproblem
 

exports.mySubmitions = async(req,res)=>{
    const data = await Solution.findAll({
        where:{
            userId:req.body.userId,
        },
        attributes: {
            exclude: ['id', 'userId']
        },
        // include:{
        //     model: SolvedProblem,
        //     attributes:['status']
        // }
    })
    res.send({
        apistatus:true,
        data:data,
        message:"all submission of user"
    })
}

exports.submitSolution = async(req , res) =>{
    const code = `num1 = int(input())
num2 = int(input())
print(num1+num2)`
    try{ 
        const problemId =req.body.problemId
        // await Solution.create({
        //     code:code,
        //     userId:req.body.userId,
        //    problemId: problemId
        // })
        // const allTestCases = await TestCase.findAll({
        //     where:{
        //         problemId:req.body.problemId
        //     } // delete id and number field from returned table to save loading unneccessary column
        // });
        await client.exists("problemid" , async(err , rep) =>{
            if(rep == 1) console.log("ex")
            else console.log("no")
        })
        const allTestCases = await  client.sMembers(`problemid:${problemId}`)
        console.log(allTestCases.length)
        var flag=1
        for(let i=0;i<allTestCases.length;++i){
            const testcase = await client.hGetAll(`testcase:${allTestCases[i]}`)
            const inputSample = testcase.input
            const outputSample = testcase.output
            //console.log(outputSample)
            await compileCode(code , inputSample).then(data =>{
                if(!(data.output.trim() === outputSample )){ 
                    flag=0
                    i=allTestCases.length
                }
            }).catch(e=>{
                console.log(e)
            })
        } 
        await SolvedProblem.create({
            status: flag ? "passed" : "failed",
            userId: req.body.userId,
            problemId: req.body.problemId
        })
        compiler.fullStat(function(data){
            console.log(data);
        });
        if(flag) 
        res.send("passed")
        else res.send("failded")
    }   
    catch(err){
        res.status(400).send({
            apistatus :false,
            error : err.message
        })
    }
}
async function  compileCode(code , input){
    var options = {stats : true}; //prints stats on console 
    compiler.init(options);
    //if windows  
    var envData = { OS : "windows"}; 
    return new Promise( (res, rej)=>{
        compiler.compilePythonWithInput(envData , code ,input, function (data) {
            if(data.error) rej(data.error)
            res(data)
        });
    } )
}
var x
function print(data){
    x=data
}
exports.addNewProblem = async (req , res) =>{
    await Problem.create({
        title:req.body.title,
        type:req.body.type,
        description:req.body.description
    })
    res.send("created new problem")
}
exports.addNewTestCase = async (req , res) =>{
    input=`2
4`
     const problemId = req.body.problemId
    const output = req.body.output
    const testcaseId = req.body.testcaseId
    await TestCase.create({
        input:input,
        output:output,
        number:req.body.number,
        problemId: problemId
    })
    try {
        client.hSet(`testcase:${testcaseId}`, 'problemid' , problemId );
        client.hSet(`testcase:${testcaseId}`, 'input' , input );
        client.hSet(`testcase:${testcaseId}`, 'output' , output );
        client.sAdd(`problemid:${problemId}`, testcaseId)
        // const r = await  client.sMembers(`problemid:${problemId}`)
        // console.log(r[0])
        // const s = await client.hGetAll(`testcase:${r[0]}`)
        // console.log(s.input)
        res.send("created new testcase")
    } catch (error) {
        console.log(error)
    }
     
}
exports.test = async (req ,res) =>{
    var options = {stats : true}; //prints stats on console 
    compiler.init(options);
    //if windows  
    var envData = { OS : "windows"}; 
    const code = `name = input()
         print(name)`
    const input = "hello"
    const name = req.body.name
    console.log(code)
    compiler.compilePythonWithInput(envData , code ,input, function (data) {
        if(data.error){
            res.send(data.error)
        }
        res.send(data.output);
    });
}

exports.signup = async (req , res) =>{
    try{ 
    await User.create({
        id:req.body.id,
        user_name:req.body.user_name,
        email:req.body.email,
        password:req.body.password,
        age:req.body.age
    })
}catch(err){
    res.send(err)
}

}