import React from 'react'
import {Link} from 'react-router-dom'
import Button from "@mui/material/Button"
import {styled} from '@mui/material/styles'
import {brown} from '@mui/material/colors'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import {CardContent, CssBaseline} from "@mui/material";

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
                    <Box sx={{
                        mt: 3
                    }}>
                        <Stack>
                            <Card sx={{
                                width: "80vw"
                            }}>
                                <CardContent>
                                    <Grid container direction={"row"} justifyContent={"space-between"}>
                                        <Grid item sx={{
                                            m: 1.5
                                        }}>
                                            <Typography>
                                                #1
                                            </Typography>
                                        </Grid>
                                        <Grid item sx={{
                                            m: 1.5
                                        }}>
                                            <Typography>
                                                Player's Game
                                            </Typography>
                                        </Grid>
                                        <Grid item sx={{
                                            m: 1.5
                                        }}>
                                            <Typography>
                                                Players: 0/8
                                            </Typography>
                                        </Grid>
                                        <Grid item sx={{
                                            m: 1.5
                                        }}>
                                            <Typography>
                                                Public
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default RoomLobby