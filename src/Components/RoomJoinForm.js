import React from 'react'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import {styled} from "@mui/material/styles";
import {brown} from "@mui/material/colors";

function RoomJoinForm() {

    const SubmitButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(brown[900]),
        backgroundColor: brown[500],
        padding: '20px',
        '&:hover': {
            backgroundColor: brown[700],
        }
    }))

    return (
        <div className={"landing-form"}>
            <form className={"d-flex flex-column"}>
                <TextField className={"l-fields"} id="filled-basic" label="Room ID" variant="filled"/>
                <TextField className={"l-fields"} id="filled-basic" label="Password (if applicable)"
                           variant="filled"/>
                <SubmitButton variant={"contained"}>Join Game</SubmitButton>
            </form>
        </div>
    )
}

export default RoomJoinForm