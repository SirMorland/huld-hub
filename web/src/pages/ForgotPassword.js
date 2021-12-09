import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Link, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from '../components/TextField';
import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';
import { StyledForm } from '../components/GenericComponents';
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
                <Typography variant="h1" align="center">
                    Forgot password
                </Typography>
                <StyledForm onSubmit={handleSubmit}>
                    <TextField
                        required
                        id="email"
                        type="email"
                        label="Email Address"
                        placeholder="john.doe@huld.io"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        errorText={emailSent}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Send password reset link
                    </Button>
                </StyledForm>
                <Link component={RouterLink} to="/login" variant="body2" color="secondary" align="center">
                    Go to login page
                </Link>
            </DialogWrapper>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Email has been sent</DialogTitle>
                <DialogContent>
                    <DialogContentText color="text" id="alert-dialog-description">
                        Reset link for the password has been sent to the described email.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>  
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </PageWrapper>
    );
}