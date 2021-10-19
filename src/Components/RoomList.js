import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import {CardContent} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, {useEffect, useState} from "react";
import axios from "axios";

function RoomList({showPrivate, showFull}) {
    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        axios.get("/api/rooms")
            .then(function (response) {
                console.log(response);

                if (!showPrivate) {
                    const filtered = response.data.filter((room) => room.isPublic === true);
                    setRoomList(filtered);
                } else if (!showFull) {
                    const filtered = response.data.filter((room) => room.players.length < 8);
                    setRoomList(filtered);
                } else {
                    setRoomList(response.data);
                }
            });
    }, [showPrivate, showFull]);

    return roomList.map((room, idx) => {
        return (
            <Box key={idx} sx={{
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
                                        {room.owner.username}&apos;s Game
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
        );
    });

}

export default RoomList;