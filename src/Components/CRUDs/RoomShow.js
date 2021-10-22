import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";
import {SocketContext} from "../../context/socket";
import Container from "@mui/material/Container";
import {Avatar} from "@mui/material";
import Typography from "@mui/material/Typography";
import {deepOrange, red, green} from "@mui/material/colors";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import ChatBox from "../ChatBox";

function RoomShow(props) {

    const socket = useContext(SocketContext);
    const [room, setRoom] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const LeaveButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        padding: "10px",
        "&:hover": {
            backgroundColor: red[700],
        }
    }));

    const StartButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        padding: "10px",
        "&:hover": {
            backgroundColor: green[700],
        }
    }));

    useEffect(() => {
        socket.removeAllListeners("syncRoom");
        socket.on("syncRoom", (room) => {
            //console.log(room)
            setRoom(room);
        });
    }, [socket]);

    useEffect(() => {
        socket.removeAllListeners("redirectToGameRoom");
        socket.on("redirectToGameRoom", () => {
            props.history.push(`/rooms/${room.id}/play`);
        });
    });

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
                                    }}>{player[0].toUpperCase()}</Avatar>
                                    <Typography>
                                        {player}
                                    </Typography>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Grid
                        container
                        direction={"row"}
                        width="19vw">
                        <Grid item xs={12}>
                            <Link to={"/lobby"}>
                                <LeaveButton fullWidth onClick={() => {
                                    socket.emit("userLeft", room, storedUser);
                                }}
                                        variant={"filled"}>Leave
                                </LeaveButton>
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link to={`/rooms/${room.id}/play`}>
                                <StartButton fullWidth onClick={() => {
                                    socket.emit("startGame", room);
                                }}
                                        variant={"filled"}>Start Game
                                </StartButton>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <ChatBox/>
            </Container>
        );
    } else {
        return (
            <div>Error</div>
        );
    }
}

export default RoomShow;