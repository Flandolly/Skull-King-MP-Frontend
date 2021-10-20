import React, {useContext, useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import axios from "axios";
import {SocketContext} from "../../context/socket"
import Container from "@mui/material/Container";
import {Avatar} from "@mui/material";
import Typography from "@mui/material/Typography";
import {deepOrange} from "@mui/material/colors";
import {Redirect} from "react-router-dom";
import Button from "@mui/material/Button";

function RoomShow(props) {

    const socket = useContext(SocketContext)
    const [room, setRoom] = useState(null)
    const storedUser = JSON.parse(localStorage.getItem("user"))


    useEffect(() => {
        socket.emit("syncRoom", props.match.url.split("/")[2])
        console.log(props.match.url.split("/")[2])
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
                <Box sx={{
                    width: "65vw",
                    height: "50vh"
                }}>
                    <Grid
                        container
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
                        <Link to={"/lobby"}>
                            <Button onClick={() => {
                                socket.emit("userLeft", room, storedUser)
                                socket.emit("syncRoom", props.match.url.split("/")[2])
                            }}
                                    variant={"filled"}>Leave
                            </Button>
                        </Link>
                    </Grid>
                </Box>
            </Container>
        )
    } else {
        return (
            <div>Error</div>
        )
    }
}

export default RoomShow