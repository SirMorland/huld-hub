import React from 'react';
import Typography from '@material-ui/core/Typography';
import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';

export default function RegistrationForm() {
    return (
        <PageWrapper>
            <DialogWrapper>
                <Typography component="h1" variant="h5" color="primary">
                    Almost done
                </Typography>
                <br/>
                <br/>
                <Typography component="p" variant="body2">
                    Thank you for registering to Hub. To finish your registration, please confirm your email address by clicking the link we sent.
                    <br/>
                    <br/>
                    Didn't receive the confirmation email? Please check your spam folder.
                    <br/>
                    <br/>
                </Typography>
                {/* <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Resend confirmation email
                </Button> */}
            </DialogWrapper>
        </PageWrapper>
    );
}