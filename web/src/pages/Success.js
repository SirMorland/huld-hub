import React from 'react';
import Typography from '@material-ui/core/Typography';
import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';
import { useLocation } from 'react-router';
import Button from '@material-ui/core/Button';

export default function RegistrationForm() {
    const {state} = useLocation();
    const email = state.email;
    const sendConfirmationEmail = () => {
        // TODO send a post request to /auth/send-email-confirmation
        // the body is an object with {email: email}
    };
    return (
        <PageWrapper>
            <DialogWrapper>
                <Typography component="h1" variant="h5" color="primary">
                    Almost done
                </Typography>
                <br/>
                <br/>
                <Typography component="p" variant="body2">
                    Thank you for registering to Hub. To finish your registration, please confirm your email address by clicking the link we sent to {email}.
                    <br/>
                    <br/>
                    Didn't receive the confirmation email? Please check your spam folder or try sending the email again by clicking the button below.
                    <br/>
                    <br/>
                </Typography>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={sendConfirmationEmail}
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Resend confirmation email
                </Button>
            </DialogWrapper>
        </PageWrapper>
    );
}