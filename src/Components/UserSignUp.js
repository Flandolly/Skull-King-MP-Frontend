import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {brown} from '@mui/material/colors';
import Alert from '@mui/material/Alert';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const axios = require("axios")

function UserSignUp() {

    const [email, setEmail] = useState("")
    const [fname, setfName] = useState("")
    const [lname, setlName] = useState("")
    const [username, setUsername] = useState("")
    const [input, setInput] = useState("")

    const theme = createTheme({
        palette: {
            primary: {
                main: brown[500]
            }
        }
    });

    function handleSubmit(event) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        axios.post("http://127.0.0.1:8080/api/signup", {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            username: data.get("username"),
            password: data.get("password")
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {

            })
    }

    function handleChange(field, value) {
        if (value.search(/^[a-zA-Z ]*$/) !== -1) {
            setInput(value)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={(event) => handleSubmit(event)} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={input}
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
                                    required
                                    fullWidth
                                    id="username"
                                    variant={"filled"}
                                    label="Username"
                                    name="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
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
    )
}

export default UserSignUp