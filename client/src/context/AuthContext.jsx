import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext()

const authReducer=(state,action)=>{
    switch(action.type){
        case "LOGIN":
            return {user:action.payload}
        case "LOGOUT":
            return {user:action.payload}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {user:null})
    useEffect(()=>{
        const usercheck = JSON.parse(localStorage.getItem('user'))
        if(usercheck){
            dispatch({type:"LOGIN",payload:usercheck})
        }
    },[])
    
    console.log('AuthContext state : ',state)
    return(
    <AuthContext.Provider value={{...state,dispatch}}>
        {children}
    </AuthContext.Provider>
    )
}