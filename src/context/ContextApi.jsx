import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const messageContainerContext = createContext()
export const authContext = createContext()


function ContextApi({ children }) {

    const [state, setState] = useState({ Boolean: true, id: '', userName: '', profilePic: '' })
    const [authContextStatus, setAuthContextStatus] = useState(
        sessionStorage.getItem('token') ? true : false
    )

    return (
        <>
            <messageContainerContext.Provider value={{ state, setState }}>
                <authContext.Provider value={{ authContextStatus, setAuthContextStatus }}>
                    {children}
                </authContext.Provider>
            </messageContainerContext.Provider>
        </>
    )
}

export default ContextApi