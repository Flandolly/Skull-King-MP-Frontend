import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import {CardContent} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {SocketContext} from "../context/socket";
import {APIURL} from "../config/config";

function RoomList({showPrivate, showFull}) {
    const [roomList, setRoomList] = useState([]);
    const socket = useContext(SocketContext);

    useEffect(() => {
        axios.get(`${APIURL}/rooms`)
            .then(function (response) {
                if (!showPrivate) {
                    const filtered = response.data.filter((room) => room.isPublic === true);
                    setRoomList(filtered);
                } else if (!showFull) {
                    const filtered = response.data.filter((room) => room.players.length < 8);
                    setRoomList(filtered);
                } else {
                    setRoomList(response.data);
                }
            })
            .catch(function(error) {
                console.log(error.response);
            });
        socket.removeAllListeners("roomList");
        socket.on("roomList", (rooms) => {
            setRoomList(rooms);
        });
    }, [showPrivate, showFull, socket]);


    return roomList.map((room, idx) => {
        return (
            <Link onClick={() => {
                localStorage.setItem("r_id", room._id);
                socket.emit("userJoined", JSON.parse(localStorage.getItem("user")), room);
            }}
                  to={`/rooms/${room.id}`} key={idx}>
                <Box sx={{
                    mt: 3
                }}>
                    <Stack>
                        <Card sx={{
                            width: "80vw"
                        }}>
                            <CardContent>
                                <Grid container direction={"row"} justifyContent={"space-between"} flexWrap={"nowrap"}>
                                    <Grid item sx={{
                                        m: 1.5
                                    }}>
                                        <Typography>
                                            #{room.id}
                                        </Typography>
                                    </Grid>
                                    <Grid item sx={{
                                        m: 1.5
                                    }}>
                                        <Typography>
                                            {room.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item sx={{
                                        m: 1.5
                                    }}>
                                        <Typography>
                                            {room.status}
                                        </Typography>
                                    </Grid>
                                    <Grid item sx={{
                                        m: 1.5
                                    }}>
                                        <Typography>
                                            Players: {room.players.length}/{room.maxPlayers}
                                        </Typography>
                                    </Grid>
                                    <Grid item sx={{
                                        m: 1.5
                                    }}>
                                        <Typography>
                                            {room.isPublic ? "Public" : "Private"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Stack>
                </Box>
            </Link>
        );
    });

}

export default RoomList;