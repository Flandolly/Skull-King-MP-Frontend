import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";
import {SocketContext} from "../../context/socket";
import {Avatar} from "@mui/material";
import Typography from "@mui/material/Typography";
import {deepOrange, red, green, amber} from "@mui/material/colors";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import ChatBox from "../ChatBox";
import Box from "@mui/material/Box";

function RoomShow(props) {

    const socket = useContext(SocketContext);
    const [room, setRoom] = useState(null);
    //TODO: Implement rules modal OR send to rules link
    //const [showRulesModal, setShowRulesModal] = useState(false);
    const storedUser = JSON.parse(localStorage.getItem("user"));


    const LeaveButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        padding: "10px",
        "&:hover": {
            backgroundColor: red[700],
        }
    }));

    const RulesButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(amber[500]),
        backgroundColor: amber[500],
        padding: "10px",
        "&:hover": {
            backgroundColor: amber[700],
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
            console.log(room);
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
        console.log(room);
        console.log(storedUser._id === room.owner);
    }

    if (room) {
        return (
            <Box component={"main"} sx={{
                mx: "50px",
            }}>
                <Grid
                    container
                    sx={{
                        width: "100%",
                        height: "60vh",
                    }}
                    direction={"row"}
                >
                    <Grid
                        container
                        width={"50%"}
                        direction={"row"}
                        justifyContent={"space-evenly"}
                        flexWrap={"wrap"}
                        sx={{
                            my: "30px"
                        }}
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
                                        {player}{storedUser._id === room.owner ?
                                        <img
                                            // onClick={() => {
                                            //     console.log(storedUser._id);
                                            //     console.log(room.owner);
                                            //     if (player === room.players.find(plyr => {
                                            //         console.log(plyr === storedUser.username);
                                            //       return plyr === storedUser.username;
                                            //     })) {
                                            //         return;
                                            //     }
                                            //     socket.emit("userLeft", room, storedUser, localStorage.getItem("socketID"), "kickUser");
                                            //     socket.on("kickUser", (destination) => {
                                            //         return <Redirect to={destination}/>;
                                            //     });
                                            // }}
                                            src="https://img.icons8.com/ios-filled/18/fa314a/x.png"
                                            alt={"removePlayer"}/> : null}
                                    </Typography>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Grid
                        container
                        direction={"row"}
                        width="50%">
                        <Grid item xs={12} sx={{
                            my: "30px"
                        }}>
                            <Link to={"/lobby"}>
                                <LeaveButton fullWidth onClick={() => {
                                    socket.emit("userLeft", room, storedUser);
                                }}
                                             variant={"filled"}>Leave Room
                                </LeaveButton>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sx={{
                            my: "30px"
                        }}>
                            <RulesButton fullWidth onClick={() => {

                            }}
                                         variant={"filled"}>Show Rules
                            </RulesButton>
                        </Grid>
                        <Grid item xs={12}>
                            <StartButton
                                fullWidth
                                onClick={() => {
                                    if (JSON.parse(localStorage.getItem("user"))._id !== room.owner) {
                                        return;
                                    } else {
                                        socket.emit("startGame", room);
                                    }
                                }}
                                variant={"filled"}
                                disabled={JSON.parse(localStorage.getItem("user"))._id !== room.owner}
                            >Start Game
                            </StartButton>
                        </Grid>
                    </Grid>
                </Grid>
                <ChatBox/>
            </Box>
        );
    } else {
        return (
            <div>Error</div>
        );
    }
}

export default RoomShow;