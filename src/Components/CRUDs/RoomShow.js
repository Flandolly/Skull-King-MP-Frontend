import React, {useContext, useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import axios from "axios";
import {SocketContext} from "../../context/socket"
import Container from "@mui/material/Container";
import {Avatar, CardContent, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {deepOrange, red} from "@mui/material/colors";
import {Redirect} from "react-router-dom";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";

function RoomShow(props) {

    const socket = useContext(SocketContext)
    const [room, setRoom] = useState(null)
    const storedUser = JSON.parse(localStorage.getItem("user"))

    const RoomButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        padding: "10px",
        "&:hover": {
            backgroundColor: red[700],
        }
    }));


    useEffect(() => {
        socket.emit("syncRoom", localStorage.getItem("r_id"))
        //console.log(props.match.url.split("/")[2])
    }, [props.match.url, socket])

    useEffect(() => {
        socket.on("syncRoom", (room) => {
            console.log(room)
            setRoom(room)
        })
    }, [socket])

    if (room) {
        return (
            <Container component={"main"}>
                <Grid
                    container
                    sx={{
                        width: "95vw",
                        height: "60vh"
                    }}
                    direction={"row"}
                >
                    <Grid
                        container
                        width={"80%"}
                        direction={"row"}
                        justifyContent={"space-evenly"}
                        flexWrap={"wrap"}
                    >
                        {room.players.map((player, idx) => {
                            return (
                                <Grid key={idx} item>
                                    <Avatar sx={{
                                        bgcolor: deepOrange[500],
                                        width: 100,
                                        height: 100
                                    }}>{storedUser.username[0].toUpperCase()}</Avatar>
                                    <Typography>
                                        {storedUser.username}
                                    </Typography>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Grid
                        container
                        direction={"row"}
                        width="19vw">
                        <Grid item xs={12}>
                            <Link to={"/lobby"}>
                                <RoomButton fullWidth onClick={() => {
                                    socket.emit("userLeft", room, storedUser)
                                    socket.emit("syncRoom", localStorage.getItem("r_id"))
                                }}
                                        variant={"filled"}>Leave
                                </RoomButton>
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link to={"/lobby"}>
                                <RoomButton fullWidth onClick={() => {
                                    socket.emit("userLeft", room, storedUser)
                                    socket.emit("syncRoom", localStorage.getItem("r_id"))
                                }}
                                        variant={"filled"}>Leave
                                </RoomButton>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    width="95vw"
                    height={"25vh"}
                    sx={{
                        mt: 3
                    }}
                >
                    <Grid item xs={12}>
                        <Card sx={{
                            height: "20vh"
                        }}>
                            <CardContent>
                                Box
                            </CardContent>
                        </Card>
                        <TextField fullWidth variant={"filled"} placeholder={"Type here..."}/>
                    </Grid>
                </Grid>
            </Container>
        )
    } else {
        return (
            <div>Error</div>
        )
    }
}

export default RoomShow