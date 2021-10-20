import React, {useContext, useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import {SocketContext} from "../../context/socket"
import Container from "@mui/material/Container";
import {Avatar} from "@mui/material";
import Typography from "@mui/material/Typography";
import {deepOrange} from "@mui/material/colors";

function RoomShow(props) {

    const socket = useContext(SocketContext)
    const [room, setRoom] = useState(null)
    const storedUser = JSON.parse(localStorage.getItem("user"))


    useEffect(() => {

        socket.on("RoomJoinResponse", (response) => {
            if (response === "Success") {
                console.log("Player successfully joined.")
            }

            if (response === "Failure") {
                console.log("Could not join.")
            }
        })

        socket.on("RoomLeaveResponse", (response) => {
            if (response === "Success") {
                console.log("Player left.")
            }
            if (response === "Room Failure") {
                console.log("Room not found.")
            }
            if (response === "Player Failure") {
                console.log("Player not found.")
            }
        })

        socket.on("syncRoom", (room) => {
            axios.put(`../api${props.match.url}`, room)
                .then(function(response) {
                    console.log(response)
                    setRoom(response.data)
                })
                .catch(function(error) {
                    console.log(error.response)
                })
        })

        socket.on("disconnect", () => {
            console.log("Player disconnected.")
            socket.emit("userLeft", storedUser, room)
        })
    },[props.match.url, socket, room, storedUser])

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
                                    <Avatar sx={{ bgcolor: deepOrange[500], width: 100, height: 100 }}>{storedUser.username[0].toUpperCase()}</Avatar>
                                    <Typography>
                                        {storedUser.username}
                                    </Typography>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </Container>
        )
    } else {
        return (
            <div>Error loading room</div>
        )
    }
}

export default RoomShow