import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {brown} from "@mui/material/colors";
import Alert from "@mui/material/Alert";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const axios = require("axios");

function UserSignUp() {

    const [email, setEmail] = useState("");
    const [fname, setfName] = useState("");
    const [lname, setlName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [helper, setHelper] = useState("");
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [userData, setUserData] = useState(null);
    const fields = [email, fname, lname, username, password];

    const theme = createTheme({
        palette: {
            primary: {
                main: brown[500]
            }
        }
    });

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.post("api/signup", {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            username: data.get("username"),
            password: data.get("password")
        })
            .then(function (response) {
                console.log(response)
                setError(false);
                setUserData({
                    email: data.get("email"),
                    password: data.get("password")
                });
            })
            .catch(function (error) {
                setError(true);
                setErrorText(error.response.data.response);
            });
    }

    function handleChange(field, value) {
        switch (field) {
            case "fname":
                if (value.search(/^[a-zA-Z ]*$/) !== -1) {
                    setfName(value);
                }
                break;
            case "lname":
                if (value.search(/^[a-zA-Z ]*$/) !== -1) {
                    setlName(value);
                }
                break;
            case "email":
                setEmail(value);
                if (value.search(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) === -1) {
                    setHelper("Invalid email address");
                } else {
                    setHelper("");
                }
                break;
            case "username":
                if (value.search(/^[A-Z_.0-9]*$/i) !== -1) {
                    if (value[0] !== undefined) {
                        if (value[0].search(/^[0-9]*$/) === -1) {
                            setUsername(value);
                        }
                    } else {
                        setUsername("");
                    }
                }
                break;
            default:
                break;
        }

    }

    if (userData) {
        return <Redirect to={{
            pathname: "/success",
            state: {userData}
        }}/>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                {error ? <Alert variant={"filled"} severity={"error"}>{errorText}</Alert> : null}
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography className={"signup-title"} component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={(event) => handleSubmit(event)} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={fname}
                                    onChange={(event) => handleChange("fname", event.target.value)}
                                    autoComplete="given-name"
                                    variant={"filled"}
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={lname}
                                    onChange={(event) => handleChange("lname", event.target.value)}
                                    required
                                    fullWidth
                                    id="lastName"
                                    variant={"filled"}
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={email}
                                    onChange={(event) => handleChange("email", event.target.value)}
                                    type={"email"}
                                    helperText={helper}
                                    required
                                    fullWidth
                                    id="email"
                                    variant={"filled"}
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={username}
                                    onChange={(event) => handleChange("username", event.target.value)}
                                    required
                                    fullWidth
                                    id="username"
                                    variant={"filled"}
                                    type={"username"}
                                    label="Username"
                                    name="username"
                                    autoComplete="nickname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={password.length < 8 && password.length !== 0}
                                    helperText={password.length < 8 && password.length !== 0 ? "Password is too short." : null}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    variant={"filled"}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            disabled={!fields.every((value) => value.length !== 0)}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login">
                                    Already have an account? Sign In
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default UserSignUp;