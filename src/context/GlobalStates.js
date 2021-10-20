import React, {useState, createContext, useMemo} from "react";

export const UserContext = createContext()
export const UserProvider = (props) => {
    const [user, setUser] = useState({
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        username: "",
    })

    const providerValue = useMemo(() => ({user, setUser}), [user, setUser])

    return (
        <UserContext.Provider value={providerValue}>
            {props.children}
        </UserContext.Provider>
    )
}