import React, {useContext, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {deepOrange} from "@mui/material/colors";
import {createTheme, styled, ThemeProvider} from "@mui/material/styles";
import {FormControlLabel, FormGroup, Switch} from "@mui/material";
import {SocketContext} from "../../context/socket"
import {UserContext} from "../../context/GlobalStates"
import axios from "axios";

function RoomCreate({setShowModal}) {

    const socket = useContext(SocketContext)
    const [user, setUser] = useContext(UserContext)
    const [success, setSuccess] = useState(false)
    const [roomID, setRoomID] = useState("")
    const [roomPublic, setRoomPublic] = useState(true)

    const theme = createTheme({
        palette: {
            primary: {
                main: deepOrange[900]
            }
        }
    })
    const SubmitButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[700],
        padding: "10px",
        "&:hover": {
            backgroundColor: deepOrange[900],
        }
    }));

    function loadUser() {

    }

    function handleSubmit(event) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        axios.post("api/rooms/new", {
            name: data.get("title"),
            maxPlayers: data.get("maxPlayers"),
            isPublic: roomPublic,
            owner: "616c1d41a37ce4f7e1314ff2"
        })
            .then(function (response) {
                console.log(response)
                socket.emit("roomCreated", response.data)
                setRoomID(response.data._id)
                setSuccess(true)
                setShowModal(false)
            })
    }

    if (success) {
        socket.emit("userJoined")
        return window.location.href = `/rooms/${roomID}`
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth={"md"}>
                <Box component={"form"} onSubmit={(event) => handleSubmit(event)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant={"filled"}
                                name={"title"}
                                defaultValue={"New Game"}
                                fullWidth
                                id={"title"}
                                label={"Room Name"}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant={"filled"}
                                name={"maxPlayers"}
                                type={"number"}
                                InputProps={{ inputProps: { min: 2, max: 8 }}}
                                fullWidth
                                id={"maxPlayers"}
                                label={"# of Players (between 2 and 8)"}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <FormControlLabel control={<Switch onChange={(event) => setRoomPublic(!event.target.checked)} color={"warning"}/>}
                                                  label="Private Room" />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <SubmitButton type="submit" fullWidth variant={"filled"}>Submit</SubmitButton>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default RoomCreate;