import React from "react";
import {Toolbar} from "@mui/material";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {brown} from "@mui/material/colors";

function Header() {

    const NewRoomButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(brown[500]),
        backgroundColor: brown[500],
        padding: "10px",
        "&:hover": {
            backgroundColor: brown[700],
        }
    }));

    return (
        <header>
            <Grid container sx={{
                backgroundColor: brown[400]
            }}>
                <Toolbar>
                   <NewRoomButton variant={"filled"}>Log Out</NewRoomButton>
                </Toolbar>
            </Grid>
        </header>
    );
}

export default Header;