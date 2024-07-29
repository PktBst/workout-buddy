const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workouts
module.exports.getAllWorkouts= async(req,res)=>{
    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt:-1})
    res.send(workouts)
}


//get a single workout
module.exports.getWorkout=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error:"No Such Workout"})
    const workout = await Workout.find({_id:id})
    if(!workout) res.send("no such workout found")
    res.send(workout)
}


//create a workout
module.exports.createWorkout = async (req,res)=>{
    const {title,load,reps}=req.body
    let emptyFields =[]
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:"Please fill all the fields",emptyFields})
    }
    try{
        const user_id = req.user._id
        const workout=await Workout.create({title,load,reps,user_id})
        res.send(workout)
    }
    catch(err){
        res.status(400).json({ error: err })
    }
}


//delete a workout
module.exports.deleteWorkout = async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error:"No Such Workout"})
    const workout = await Workout.findByIdAndDelete({_id:id})
    if(!workout) res.send("no such workout found")
    res.send(workout)
}


//update a workout
module.exports.updateWorkout = async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error:"No Such Workout"})
    const workout = await Workout.findByIdAndUpdate({_id:id},{...req.body})
    if(!workout) res.send("no such workout found")
    res.send(req.body)
}