import React from 'react'
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

function RoomJoinForm() {
    return (
        <div className={"landing-form"}>
            <form className={"d-flex flex-column"}>
                <TextField className={"l-fields"} id="filled-basic" label="Room ID" variant="filled"/>
                <TextField className={"l-fields"} type={"password"} id="filled-basic" label="Password (if applicable)"
                           variant="filled"/>
            </form>
        </div>
    )
}

export default RoomJoinForm