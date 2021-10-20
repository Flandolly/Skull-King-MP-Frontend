/*
Sourced from: https://medium.com/geekculture/how-to-use-context-api-and-jwt-to-maintain-user-sessions-eb5602e83a03
 */

import React, {useState, createContext} from "react";

export const UserContext = createContext()
export const UserProvider = (props) => {
    const [user, setUser] = useState({
        _id: "",
        username: "",
        token: ""
    })

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}