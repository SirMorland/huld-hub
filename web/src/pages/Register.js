import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';
import { EmailTakenError, EmailWrongDomainError } from '../api';

export default function RegistrationForm({ onSubmit }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setEmailError('');
        setPasswordError('');

        if (password !== reEnterPassword){
            setPasswordError("Passwords do not match! Please check");
        } else if (email && password && password === reEnterPassword) {
            try {
                const json = await onSubmit(email, password);
                Cookies.set("hub-jwt", json.jwt);
                history.push("/almost-done");
            } catch  (error) {
                switch(true) {
                    case error instanceof EmailWrongDomainError:
                        setEmailError(error.message);
                        break;
                    case error instanceof EmailTakenError:
                        setEmailError("Email already taken!");
                        break;
                    default:
                        setPasswordError(error.message);
                        break;
                }
            }
        }
    };

    return (
        <PageWrapper>
            <DialogWrapper>
                <Typography component="h1" variant="h5" color="primary">
                    Register to Hub
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                type="email"
                                label="Email Address"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            {emailError &&
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <Grid container justifyContent="center">
                                        <Grid item>
                                            <Typography component="p" variant="body2" color="error">
                                                {emailError}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                id="password"
                                name="password"
                                label="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                id="reEnterPassword"
                                name="reEnterPassword"
                                label="Re-Enter Password"
                                value={reEnterPassword}
                                onChange={e => setReEnterPassword(e.target.value)}
                            />
                            {passwordError &&
                                <React.Fragment>
                                    <br />
                                    <br />
                                    <Grid container justifyContent="center">
                                        <Grid item>
                                            <Typography component="p" variant="body2" color="error">
                                                {passwordError}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            }
                        </Grid>
                    </Grid>
                    <br />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    <br />
                    <br />
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link href="/" variant="body2" color="secondary">
                                Already a member? Login instead
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </DialogWrapper>
        </PageWrapper>
    );
}