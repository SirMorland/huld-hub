import React, { useState } from 'react';

import { Box } from '@mui/system';
import { Button, Grid, Link, Typography } from '@mui/material';

import TextField from '../components/TextField';
import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';
import { sendPasswordReset } from '../api';

export default function RegistrationForm() {

    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const json = await sendPasswordReset(email);
            if (json){
                setEmail('');
                setEmailSent("Reset link has been sent");
            }
         
        } catch (error) {
            setEmailSent("Email not found");
        }
    };

    return (
        <PageWrapper>
            <DialogWrapper>
                <Typography component="h1" variant="h5" color="primary">
                    Forgot password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%'  }}>
                    <Grid container >
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="email"
                                type="email"
                                label="Email Address"
                                placeholder="john.doe@huld.io"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                          
                        </Grid>
                        {emailSent &&
                                <React.Fragment>
                                    <br />
                                    <Grid container justifyContent="center">
                                        <Grid item>
                                            <Typography component="p" variant="body2" color="error">
                                                {emailSent}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            }
                      
                        
                    </Grid>
                    <br />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send password reset link
                    </Button>
                    <br />
                    <br />
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link href="/login" variant="body2" color="secondary">
                                Go to login
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </DialogWrapper>
        </PageWrapper>
    );
}