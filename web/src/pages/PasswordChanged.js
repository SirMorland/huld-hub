import React from 'react';

import { Typography } from '@mui/material';
import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';
import { Link } from 'react-router-dom';

export default function PasswordChanged() {
    return (
        <PageWrapper>
            <DialogWrapper>
                <Typography component="h1" variant="h5" color="primary">
                    Password changed
                </Typography>
                <br />
                <Typography component="p" variant="body2">
                    You may now login with your updated credentials
                </Typography>
                <br />
                <Link to="/login">Go to login page</Link>
            </DialogWrapper>
        </PageWrapper>
    );
}