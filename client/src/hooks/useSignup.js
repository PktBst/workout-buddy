import { useState } from "react";
import {useAuthContext} from './useAuthContext'
import axios from "axios";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isloading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email,password)=>{
        setIsLoading(true)
        setError(null)

        const user = {email,password}

        axios.post(process.env.REACT_APP_API_URL+'/api/user/signup',user)
        .then(response=>{
            console.log(response.data)
            localStorage.setItem('user',JSON.stringify(response.data))
            dispatch({type: 'LOGIN', payload:response.data})
            setIsLoading(false)
        })
        .catch(err=>{
            setIsLoading(false)
            console.log(err.response.data)
            setError(err.response.data.error)
        })

    }

    return ( {signup,error,isloading} );
}


