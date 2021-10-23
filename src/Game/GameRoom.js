import React, {useContext, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {SocketContext} from "../context/socket";
import Typography from "@mui/material/Typography";
import {Backdrop, Fade, Modal} from "@mui/material";
import {brown, deepOrange} from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

function GameRoom() {

    const [gameState, setGameState] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const socket = useContext(SocketContext);

    const SubmitButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[700],
        padding: "10px",
        "&:hover": {
            backgroundColor: deepOrange[900],
        }
    }));

    const modalStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        top: "35%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "30vw",
        bgcolor: brown[300],
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        socket.removeAllListeners("gameStarted");
        socket.on("gameStarted", (data) => {
            setGameState(data[0]);
        });

        setTimeout(() => {
            setShowModal(true);
        }, 500);
    }, [socket]);

    useEffect(() => {

    }, [socket]);


    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setShowModal(false);
        setGameState({
            ...gameState,
            bid: parseInt(data.get("bid").toString())
        });

        console.log(gameState);
    }

    if (gameState) {
        socket.removeAllListeners("getBid");
        socket.on("getBid", () => {
            socket.emit("sendBid", gameState, localStorage.getItem("r_id"));
        });
    }

    if (gameState) {
        return (
            <Container component={"main"}>
                <Modal
                    aria-labelledby={"modal-title"}
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={showModal}>
                        <Box component={"form"} onSubmit={(event) => handleSubmit(event)} sx={modalStyle}>
                            <Typography id={"modal-title"}>Enter bid</Typography>
                            <Grid container direction={"column"}>
                                <Grid xs={12} item>
                                    <TextField
                                        variant={"filled"}
                                        name={"bid"}
                                        type={"number"}
                                        InputProps={{ inputProps: { min: 0, max: 10 }}}
                                        fullWidth
                                        id={"bid"}
                                        label={"Enter bid..."}
                                        required
                                        autoFocus
                                    />
                                </Grid>
                                <Grid xs={12} item>
                                    <SubmitButton type="submit" fullWidth variant={"filled"}>Submit</SubmitButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
                <Box>
                    <Grid
                        container
                        justifyContent={"center"}
                        alignItems={"center"}
                        direction={"row"}
                        sx={{
                            height: "60vh"
                        }}>
                        <Grid sx={{
                            height: "200px",
                            width: "150px",
                            border: "1px solid black",
                            margin: "5px",
                            textAlign: "center",
                        }} item>
                            Card Deck
                        </Grid>
                        <Grid sx={{
                            height: "200px",
                            width: "150px",
                            border: "1px solid black",
                            margin: "5px",
                            textAlign: "center"
                        }} item>
                            Card Played
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justifyContent={"center"}
                        direction={"row"}
                        sx={{
                            height: "30vh"
                        }}>
                        {gameState.hand.map((card, idx) => {
                            return (
                                <Grid sx={{
                                    height: "200px",
                                    width: "150px",
                                    border: "1px solid black",
                                    margin: "5px",
                                    textAlign: "center"
                                }} item key={idx}>
                                    <Typography>
                                        {card.suit}
                                    </Typography>
                                    <Typography>
                                        {card.value}
                                    </Typography>
                                </Grid>
                            );
                        })
                        }
                    </Grid>
                </Box>
            </Container>
        );
    } else {
        return (
            <div>Error loading game room</div>
        );
    }
}

export default GameRoom;