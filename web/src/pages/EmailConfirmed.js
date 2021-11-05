import React from 'react';
import Cookies from 'js-cookie';

import { Typography } from '@mui/material';

import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';
import { Link } from 'react-router-dom';

export default function EmailConfirmed() {
    const jwt = Cookies.get("hub-jwt");

    return (
        <PageWrapper>
            <DialogWrapper>
                <Typography component="h1" variant="h5" color="primary">
                    Email confirmed
                </Typography>
                <br/>
                <br/>
                <Typography component="p" variant="body2">
                    Your registration to Hub is now completed!
                </Typography>
                <br/>
                <Typography component="p" variant="body2">
                    Finish up by filling your profile with your information.
                </Typography>
                <br />
                {jwt ?
                    <Link to="/">Go to my profile</Link>
                :
                    <Link to="/login">Go to login page</Link>
                }
            </DialogWrapper>
        </PageWrapper>
    );
}