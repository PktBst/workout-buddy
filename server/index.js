require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const workoutRoute = require('./routes/workouts')
const userRoute=require('./routes/user')
const mongoose=require('mongoose')

app.use(cors())
app.use(express.json())

app.use('/api/workouts',workoutRoute)
app.use('/api/user',userRoute)

app.use('/',(req,res)=>{
    res.send("base url")
})

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("connected to DB & listening to PORT 4000")
        })
    })
    .catch((err)=>console.log(err))
