import React, { useState } from 'react'
import axios from 'axios'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'

export default function WorkoutForm() {
    const [error, setError] = useState(null)
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setload] = useState('')
    const {dispatch} = useWorkoutContext()
    const [emptyFields, setEmptyFields] = useState([])

    const { user } = useAuthContext()

    const handleSubmit=(e)=>{
        e.preventDefault()
        const newWorkout ={title,reps,load}
        // console.log(newWorkout)

        if(!user){
            setError('you must be logged in!')
            return
        }

        axios.post(process.env.REACT_APP_API_URL+'/api/workouts',newWorkout,
            {
              headers:{
                "Authorization": `Bearer ${user.token}`
              }
            })
        .then((res)=>{
            setTitle('')
            setReps('')
            setload('')
            console.log(res.data)
            dispatch({type:"CREATE_WORKOUTS",payload:res.data})
            setError(null)
            setEmptyFields([])
        })
        .catch((err)=>{
            console.log(err)
            // setError(err.response.data.error)
            // setError(err.response.data.error.message)
            setEmptyFields(err.response.data.emptyFields)
            setError("fill all the required fields!")
        })
    }

  return (
    <form className='form' onSubmit={(e)=>{handleSubmit(e)}}>
        <h3>Add a new workout</h3>
        <div className="form-input">
        <label>Exercise Title</label>
            <input 
                type="text"
                onChange={(e)=>{setTitle(e.target.value)}} 
                value={title}
                className={emptyFields.includes('title')?"error":""}
            />
        </div>

        <div className="form-input">
        <label>Exercise Reps</label>
            <input 
                type="number"
                onChange={(e)=>{setReps(e.target.value)}} 
                value={reps}
                className={emptyFields.includes('reps')?"error":""}
            />
        </div>

        <div className="form-input">
        <label>Exercise Load</label>
            <input 
                type="number"
                onChange={(e)=>{setload(e.target.value)}} 
                value={load}
                className={emptyFields.includes('load')?"error":""}
            />
            <button>Add Workout</button>
        </div>
        <div className="error-message-workoutForm">{error}</div>
    </form>
  )
}
