import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import {CardContent} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, {useEffect, useState} from "react";
import axios from "axios"

function RoomList() {
    const [roomList, setRoomList] = useState([])

    useEffect(() => {
        axios.get("/api/rooms")
            .then(function (response) {
                console.log(response)
                setRoomList(response.data)
            })
    }, [])

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
                            <Grid container direction={"row"} justifyContent={"space-between"}>
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
                                        {room.owner.username}'s Game
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
                                        Players: {room.players.length}/8
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
        )
    })

}

export default RoomList