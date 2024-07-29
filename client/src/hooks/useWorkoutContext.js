import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext =()=>{
    const context = useContext(WorkoutContext)
    if(!context) throw Error("WorkoutContext must be used inside ContextProvider")
    return context
}