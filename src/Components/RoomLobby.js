import React, {useState} from "react";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import {red, brown} from "@mui/material/colors";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import RoomList from "./RoomList";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {Backdrop, CssBaseline, Fade, FormControlLabel, FormGroup, Modal} from "@mui/material";
import RoomCreate from "./CRUDs/RoomCreate";

function RoomLobby() {

    const [showPrivate, setShowPrivate] = useState(false);
    const [showFull, setShowFull] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const theme = createTheme({});
    const modalStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80vw",
        bgcolor: brown[300],
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const NewRoomButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        padding: "10px",
        "&:hover": {
            backgroundColor: red[700],
        }
    }));

    return (
        <ThemeProvider theme={theme}>
            <Modal
            aria-labelledby={"modal-title"}
            aria-describedby={"modal-desc"}
            open={showModal}
            onClose={() => setShowModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            >
            <Fade in={showModal}>
                <Box sx={modalStyle}>
                    <Typography id={"modal-title"} alignSelf="start">New Room</Typography>
                    <Typography id={"modal-desc"}>Settings</Typography>
                    <RoomCreate setShowModal={setShowModal}/>
                </Box>
            </Fade>
            </Modal>
            <Container component={"main"} maxWidth={"md"}>
                <CssBaseline/>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <Typography className="lobby-title" component="h1" variant="h3">
                        Room List
                    </Typography>
                    <Box sx={{
                        width: "80vw",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <NewRoomButton onClick={() => setShowModal(true)} variant={"contained"}>New Room</NewRoomButton>
                        <Box>
                            <FormGroup sx={{
                                display: "inline",
                            }}>
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={(event) => {setShowPrivate(event.target.checked);}}
                                        size={"small"}/>}
                                    label="Show Private"/>
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={(event) => {setShowFull(event.target.checked);}}
                                        size={"small"}/>}
                                    label="Show Full"/>
                            </FormGroup>
                        </Box>
                    </Box>
                    <RoomList showPrivate={showPrivate} showFull={showFull}/>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default RoomLobby;