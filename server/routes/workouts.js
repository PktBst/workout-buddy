const express=require('express')
const router=express.Router()
const Workout=require('../models/workoutModel')
const WorkoutController=require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

//check for auth user
router.use(requireAuth)

//get all workouts
router.get('/',WorkoutController.getAllWorkouts)

//get one workout
router.get('/:id',WorkoutController.getWorkout)

//workout posted
router.post('/',WorkoutController.createWorkout)

//workout updated
router.patch('/:id',WorkoutController.updateWorkout)

router.delete('/:id',WorkoutController.deleteWorkout)

module.exports =router