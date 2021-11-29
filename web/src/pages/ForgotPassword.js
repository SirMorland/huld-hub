import React, { useState } from 'react';

import { Box } from '@mui/system';
import { Button, Grid, Link, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from '../components/TextField';
import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';
import { sendPasswordReset } from '../api';

export default function PasswordResetLinkForm() {

    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setEmailSent('');
        try {
            const json = await sendPasswordReset(email);
            if (json) {
                setEmail('');
                setOpen(true);
            }
        } catch (error) {
            setEmailSent("Email not found");
        }
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <PageWrapper>
            <DialogWrapper>
                <Typography component="h1" variant="h5" color="primary">
                    Forgot password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
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
                                Go to login page
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </DialogWrapper>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Email has been sent"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText color="text" id="alert-dialog-description">
                        Reset link for the password has been sent to the described email.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>  
                    <Button onClick={handleClose} autoFocus>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </PageWrapper>
    );
}