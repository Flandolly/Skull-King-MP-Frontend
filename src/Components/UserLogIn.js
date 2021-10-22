import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import {Link, Redirect} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {brown} from "@mui/material/colors";
import axios from "axios";
import {useState} from "react";
import Alert from "@mui/material/Alert";
import {APIURL} from "../config/config";

const theme = createTheme({
    palette: {
        primary: {
            main: brown[500]
        }
    }
});

function UserLogIn() {

    const [token, setToken] = useState(null);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.post(`${APIURL}/signin`, {
            email: data.get("email"),
            password: data.get("password"),
        })
            .then(function (response) {
                console.log(response);
                setToken(response.data.token);
            })
            .catch(function (error) {
                console.log(error.response);
                setError(true);
                setErrorText(error.response.data);
                setPassword("");
                setEmail("");
            });
    }

    if (token) {
        return <Redirect to={{
            pathname: "/lobby",
            state: {token}
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
                    <Typography className="signin-title" component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            value={email}
                            type={"email"}
                            onChange={(event) => setEmail(event.target.value)}
                            fullWidth
                            variant={"filled"}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            fullWidth
                            variant={"filled"}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/*<FormControlLabel*/}
                        {/*    control={<Checkbox value="remember" color="primary" />}*/}
                        {/*    label="Remember me"*/}
                        {/*/>*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
        ;
}

export default UserLogIn;