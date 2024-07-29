import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
// import { useState } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Home() {
    // const [workouts, setWorkouts] = useState([])
    const {workouts,dispatch} = useWorkoutContext()

    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = ()=> 
        axios.get(process.env.REACT_APP_API_URL+'/api/workouts/',
          {
            headers:{
              "Authorization": `Bearer ${user.token}`
            }
          }
        )
        .then(res=>{
          // setWorkouts(res.data)
          const data=res.data
          dispatch({type:'SET_WORKOUTS',payload:data})
        })
        // .then(res=>console.log(workouts))
        .catch(err=>console.log(err))

        if(user){
          fetchWorkouts()
        }
    
    }, [dispatch,user])
    

  return (
    <div className='app-display'>
        <WorkoutDetails workouts={workouts}/>
        <WorkoutForm></WorkoutForm>
    </div>
  )
}
