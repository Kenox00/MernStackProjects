
import { createContext, useReducer } from "react";

export const Authcontext = createContext();

const AuthReducer = ( state, action ) =>{

    switch (action.type) {
        case 'LOGIN':
            return { user:action.payload}
            
        case 'LOGOUT':
            return { user:null}
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) =>{
    const [state,dispatch] = useReducer(AuthReducer,{
        user:null
    })

    console.log('Authcontext ', state)

    return (
        <Authcontext.Provider value={{...state,dispatch}}>
            { children }
        </Authcontext.Provider>
    )
}