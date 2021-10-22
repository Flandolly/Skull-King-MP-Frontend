import React, {useState} from 'react'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function GameRoom() {

    const [gameState, setGameState] = useState(null)

    return (
        <Container>
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
                    <Grid sx={{
                        height: "200px",
                        width: "150px",
                        border: "1px solid black",
                        margin: "5px",
                        textAlign: "center"
                    }} item>
                        Card Played
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
            </Box>
        </Container>
    )
}

export default GameRoom