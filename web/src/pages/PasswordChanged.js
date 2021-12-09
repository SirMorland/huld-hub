import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, Typography } from '@mui/material';

import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';

export default function PasswordChanged() {
    return (
        <PageWrapper>
            <DialogWrapper>
                <Typography variant="h1" align="center">
                    Password changed
                </Typography>
                <Typography component="p" variant="body2" align="center">
                    You may now login with your updated credentials
                </Typography>
                <Link component={RouterLink} to="/login" variant="body2" color="secondary" align="center">
                    Go to login page
                </Link>
            </DialogWrapper>
        </PageWrapper>
    );
}