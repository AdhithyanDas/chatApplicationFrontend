import React, { useState } from "react";
import { createContext } from "react";

export const messageContainerContext = createContext()


function ContextApi({ children }) {

    const [state, setState] = useState({ Boolean: true, id: '', userName: '', profilePic: '' })

    return (
        <>
            <messageContainerContext.Provider value={{ state, setState }}>
                {children}
            </messageContainerContext.Provider>
        </>
    )
}

export default ContextApi