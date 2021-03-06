import React from "react";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import {brown} from "@mui/material/colors";
// import RoomJoinForm from "./RoomJoinForm";

function Home() {

    const UserButton = styled(Button)(({theme}) => ({
        color: theme.palette.getContrastText(brown[900]),
        backgroundColor: brown[500],
        padding: "20px",
        "&:hover": {
            backgroundColor: brown[700],
        }
    }));

    if (localStorage.getItem("userToken")) {
        return window.location.href = "/lobby";
    }

    return (
        <div className={"main-container d-flex flex-column justify-content-center align-items-center"}>
            <h1 className={"landing-title"}>Skull King Online</h1>
            <div className={"landing-buttons d-flex"}>
                <Link to={"/login"}><UserButton variant={"contained"}>Log In</UserButton></Link>
                <div className={"landing-divider"}
                     style={{borderLeft: "2px solid black", height: "64px", display: "inline"}}>

                </div>
                <Link to={"/signup"}><UserButton variant={"contained"}>Sign Up</UserButton></Link>
            </div>
        </div>
    );
}

export default Home;