import React, {useContext, useEffect} from "react";
import Grid from "@mui/material/Grid";
import {List, Paper, TextField} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {SocketContext} from "../context/socket";


function ChatBox() {

    const socket = useContext(SocketContext);

    const theme = createTheme({

    });

    useEffect(() => {
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
    });

    function handleSubmit(event) {
        //console.log(window.location.href.split("/")[4])
        event.preventDefault();
        const message = new FormData(event.currentTarget);
        socket.emit("chatMessage", window.location.href.split("/")[4], message.get("message"));
        document.getElementById("message").value = "";
    }

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Grid
                    container
                    width="95vw"
                    height={"25vh"}
                    sx={{
                        mt: 3
                    }}
                >
                    Chat
                    <Grid item xs={12}>
                        <Paper id={"chatbox"} sx={{
                            height: "20vh",
                            border: "2px solid orange",
                            overflowY: "scroll",
                            overflow: "auto"
                        }}>
                            <List id="chat">

                            </List>
                        </Paper>
                        <Box onSubmit={(event) => handleSubmit(event)} component={"form"}>
                            <TextField
                                fullWidth
                                variant={"filled"}
                                placeholder={"Type here..."}
                                name={"message"}
                                id={"message"}
                                autoComplete={"off"}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    );
}

export default ChatBox;