import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext =()=>{
    const context = useContext(AuthContext)
    if(!context) throw Error("authtContext must be used inside ContextProvider")
    return context
} 