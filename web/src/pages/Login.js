import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Cookies from 'js-cookie';

import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';
import { EmailOrPasswordInvalidError } from '../api';

export default function LoginForm({ onSubmit }) {
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const json = await onSubmit(email, password);
            Cookies.set("hub-jwt", json.jwt);
            history.push(`/${json.user.id}`);
        } catch(error) {
            switch(true) {
                case error instanceof EmailOrPasswordInvalidError:
                    setError("Incorrect email or password!");
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <PageWrapper>
            <DialogWrapper>
                {location.search.includes('confirmed=true') && <Typography component="p" variant="body" > Your email has been confirmed. You can log in now <br /><br /></Typography>}
                <Typography component="h1" variant="h5" color="primary">
                    Log in to Hub
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
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
                            <br />
                            <br />
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Typography component="p" variant="body2" color="error">
                                        {error && `${error} `}
                                        <Link href="#" variant="body2" color="secondary">
                                            Forgot Password?
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
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
                        LOG IN
                    </Button>
                    <br />
                    <br />
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link href="/register" variant="body2" color="secondary">
                                Not Registered? Create an account
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </DialogWrapper>
        </PageWrapper>

    );
}