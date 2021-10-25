import React, {useContext, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {SocketContext} from "../context/socket";
import Typography from "@mui/material/Typography";
import {Backdrop, Fade, List, Modal, Paper} from "@mui/material";
import {brown, deepOrange} from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

function GameRoom() {

    const [gameState, setGameState] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const [showGameOverModal, setShowGameOverModal] = useState(false);
    const [bidMade, setBidMade] = useState(false);
    const [lastCard, setLastCard] = useState(null);
    const [tricks, setTricks] = useState(0);
    const [bid, setBid] = useState(0);
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

    const gameOverModalStyle = {
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
            // setGraveyard(data[1]);
        });

        socket.on("newRoundStarted", (data) => {
            setGameState(data[0]);
            setBidMade(false);
            setShowModal(true);
            setBid(0);
            setTricks(0);
            setLastCard("");
        });

        if (!bidMade) {
            setTimeout(() => {
                setShowModal(true);
            }, 500);
        }
    }, [socket]);

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setShowModal(false);
        setBidMade(true);
        setGameState({
            ...gameState,
            bid: parseInt(data.get("bid").toString())
        });

        socket.emit("sendBid", gameState.name, parseInt(data.get("bid").toString()), localStorage.getItem("r_id"), localStorage.getItem("socketID"));
    }

    function handleClickedCard(event) {
        if (event.currentTarget.classList.includes("not-clickable")) {
            return;
        } else {
            const playedCard = event.currentTarget.innerText.split("\n\n");

            const cards = document.querySelectorAll(".card");

            for (const card of cards) {
                card.classList.add("not-clickable");
                card.style.opacity = 0.5;
            }

            const findCardIndex = gameState.hand.findIndex((card) => card.suit === playedCard[0] && card.value === parseInt(playedCard[1]));
            gameState.hand.splice(findCardIndex, 1);
            setGameState({
                ...gameState,
                hand: gameState.hand
            });

            setLastCard(playedCard.join(" "));

            socket.emit("sendPlayedCard", gameState, localStorage.getItem("r_id"), {
                suit: playedCard[0],
                value: playedCard[1]
            }, localStorage.getItem("socketID"));
        }
    }

    if (gameState) {

        socket.removeAllListeners("playerCanPlay");
        socket.on("playerCanPlay", () => {
            const cards = document.querySelectorAll(".card");

            for (const card of cards) {
                card.classList.remove("not-clickable");
                card.style.opacity = 1;
            }
        });

        socket.removeAllListeners("updatePlayedCard");
        socket.on("updatePlayedCard", (card) => {
            setLastCard(`${card.suit} ${card.value}`);
        });

        socket.removeAllListeners("playerWonTrick");
        socket.on("playerWonTrick", (winner) => {
            console.log("Winner: ", winner);
        });

        socket.removeAllListeners("showLeaderboard");
        socket.on("showLeaderboard", (players) => {
            setLeaderboard(players);
        });

        socket.removeAllListeners("gameOver");
        socket.on("gameOver", () => {
            setShowGameOverModal(true);
        });

        socket.removeAllListeners("updateTricks");
        socket.on("updateTricks", (tricks) => {
            setTricks(tricks);
        });

        socket.removeAllListeners("updateBid");
        socket.on("updateBid", (bid) => {
            setBid(bid);
        });


        socket.removeAllListeners("redirectToLobby");
        socket.on("redirectToLobby", () => {
            return window.location.href = "/lobby";
        });

        socket.removeAllListeners("message");
        socket.on("message", (message) => {
            console.log("Chat message");
            const chatbox = document.getElementById("chat");
            const msg = document.createElement("li");
            msg.style.paddingLeft = "10px";
            msg.innerText = message;
            chatbox.appendChild(msg);
            const chat = document.getElementById("chatbox");
            chat.scrollTop = chat.scrollHeight - chat.clientHeight;
        });
    }

    if (gameState) {
        return (
            <Container component={"main"}>
                <Grid
                    container
                    width="400px"
                    height={"25vh"}
                    sx={{
                        position: "absolute",
                        top: "10%"
                    }}
                >
                    Info
                    <Grid item xs={12}>
                        <Paper id={"chatbox"} sx={{
                            height: "20vh",
                            border: "2px solid orange",
                            overflowY: "scroll",
                            overflow: "auto",
                            mb: "10px"
                        }}>
                            <List id="chat">

                            </List>
                        </Paper>
                    </Grid>
                </Grid>
                <Modal
                    aria-labelledby={"modal-title"}
                    open={showModal}
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
                                        InputProps={{inputProps: {min: 0, max: 10}}}
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
                <Modal
                    aria-labelledby={"gameover-modal-title"}
                    open={showGameOverModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={showGameOverModal}>
                        <Box sx={gameOverModalStyle}>
                            <Typography id={"gameover-modal-title"}>Game Over!</Typography>
                            <Typography>Redirecting back to lobby in 15 seconds...</Typography>
                            <Typography>________________________________</Typography>
                            <Grid container direction={"column"}>
                                {leaderboard.map((player, idx) => {
                                    return (
                                        <Grid key={idx} textAlign="center" item xs={12}>
                                            {player.playerName} ({player.points} Points)
                                        </Grid>
                                    );
                                })}
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
                        <Grid
                            id={"last-played-card"}
                            justifyContent={"center"}
                            direction="column"
                            sx={{
                                height: "200px",
                                width: "150px",
                                border: "1px solid black",
                                margin: "5px",
                                textAlign: "center"
                            }} container>
                            {lastCard}
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                        Tricks: {tricks}/{bid}
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
                                <Grid
                                    direction={"column"}
                                    flexWrap={"nowrap"}
                                    justifyContent={"center"}
                                    onClick={(e) => handleClickedCard(e)}
                                    id={"game-card"}
                                    className="card not-clickable"
                                    sx={{
                                        height: "200px",
                                        width: "150px",
                                        border: "1px solid black",
                                        margin: "5px",
                                        textAlign: "center"
                                    }} container key={idx}>
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