import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import {CardContent} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {SocketContext} from "../context/socket"

function RoomList({showPrivate, showFull}) {
    const [roomList, setRoomList] = useState([]);
    const socket = useContext(SocketContext);

    useEffect(() => {
        axios.get("/api/rooms")
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
    }, [showPrivate, showFull]);

    useEffect(() => {
        socket.on("roomList", (rooms) => {
            setRoomList(rooms)
        })
    }, [socket])

    return roomList.map((room, idx) => {
        return (
            <Link onClick={() => socket.emit("userJoined")} to={`/rooms/${room._id}`} key={idx}>
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