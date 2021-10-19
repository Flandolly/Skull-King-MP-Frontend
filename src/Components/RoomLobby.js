import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Button from "@mui/material/Button"
import {styled} from '@mui/material/styles'
import {red} from '@mui/material/colors'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import RoomList from "./RoomList"
import {ThemeProvider, createTheme} from '@mui/material/styles'
import {CssBaseline, FormControlLabel, FormGroup} from "@mui/material";
import {SocketContext} from "../context/socket"

function RoomLobby() {

    const [showPrivate, setShowPrivate] = useState(false)
    const [showFull, setShowFull] = useState(false)

    const theme = createTheme({})

    const NewRoomButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        padding: '10px',
        '&:hover': {
            backgroundColor: red[700],
        }
    }))



    return (
        <ThemeProvider theme={theme}>
            <Container component={"main"} maxWidth={"md"}>
                <CssBaseline/>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <Typography className="lobby-title" component="h1" variant="h3">
                        Room List
                    </Typography>
                    <Box sx={{
                        width: "80vw",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <NewRoomButton variant={"contained"}>Create Room</NewRoomButton>
                        <Box>
                            <FormGroup sx={{
                                display: "inline",
                            }}>
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={(event) => {setShowPrivate(event.target.checked)}}
                                        size={"small"}/>}
                                    label="Show Private"/>
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={(event) => {setShowFull(event.target.checked)}}
                                        size={"small"}/>}
                                    label="Show Full"/>
                            </FormGroup>
                        </Box>
                    </Box>
                    <RoomList showPrivate={showPrivate} showFull={showFull}/>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default RoomLobby