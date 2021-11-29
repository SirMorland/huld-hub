import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import { Box } from '@mui/system';
import { Button, Grid, Typography } from '@mui/material';

import TextField from '../components/TextField';
import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';
import { resetPassword } from '../api';

export default function ResetPasswordForm() {

    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const history = useHistory();
    const location = useLocation();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setPasswordError('');
        let searchParams = new URLSearchParams(location.search);
        const code = searchParams.get("code");

        if (password !== reEnterPassword){
            setPasswordError("Passwords do not match! Please check");
        } else if (password && password === reEnterPassword) {
            try {
                const json = await resetPassword(code,password, reEnterPassword);
                if (json){
                    history.push("/passwordchanged");
                }
            } catch (error) {
                setPasswordError("Encountered an error when attempting to change password");
            }
        }
    };

    return (
        <PageWrapper>
            <DialogWrapper>
                <Typography component="h1" variant="h5" color="primary">
                    Reset password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                    <Grid container spacing={2}>
                        
                        <Grid item xs={12}>
                            <TextField
                                required
                                type="password"
                                id="password"
                                name="password"
                                label="New Password"
                                placeholder="********"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                type="password"
                                id="reEnterPassword"
                                name="reEnterPassword"
                                label="Re-Enter Password"
                                placeholder="********"
                                value={reEnterPassword}
                                onChange={e => setReEnterPassword(e.target.value)}
                            />
                            {passwordError &&
                                <React.Fragment>
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
                        Reset
                    </Button>
                </Box>
            </DialogWrapper>
        </PageWrapper>
    );
}