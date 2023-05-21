const express = require('express')

const router = new express.Router()

const controller = require('../controller/controller')
router.post('/' , controller.test)
router.post('/signup' , controller.signup)
router.post('/problem' , controller.addNewProblem)
router.post('/testcase' , controller.addNewTestCase)
router.post('/submition' , controller.submitSolution)
router.post('/mysubmitions', controller.mySubmitions)
module.exports = router