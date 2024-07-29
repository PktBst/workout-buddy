import axios from 'axios'
import React from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'

export default function WorkoutDetails(props) {
    const workouts=props.workouts
    const {dispatch} = useWorkoutContext()
    const { user } = useAuthContext()
    const handleDelete=(_id)=>{
      // console.log(_id)
      if(!user){
        return
      }
      axios.delete(process.env.REACT_APP_API_URL+'/api/workouts/'+_id,
        {
          headers:{
            "Authorization": `Bearer ${user.token}`
          }
        })
        .then(res=>{
          dispatch({type:'DELETE_WORKOUT',payload:res.data})
          console.log(res)
        })
        .catch(err=>{
          console.log(err)
        })
    }
  return (
    <div className="workouts">
            {workouts && workouts.map((workout,index)=>(
                <div className="workout" key={index}>
                    <h3>{workout.title}</h3>
                    <hr />
                    <p>{workout.reps+" Reps"}</p>
                    <p>{workout.load+" kg"}</p>
                    <p className='time'>{formatDistanceToNow(new Date(workout.createdAt),{addSufix:true})}</p>
                    <button onClick={()=>handleDelete(workout._id)} className="material-symbols-outlined delete">Delete</button>
                </div>
            ))}
        </div>
  )
}
