import React from 'react'
import {Link} from 'react-router-dom'
import Button from "@mui/material/Button"
import {styled} from '@mui/material/styles'
import {brown} from '@mui/material/colors'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import RoomList from "./RoomList"
import {ThemeProvider, createTheme} from '@mui/material/styles'
import {CssBaseline} from "@mui/material";

function RoomLobby() {

    const theme = createTheme({

    })

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
                    <RoomList/>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default RoomLobby