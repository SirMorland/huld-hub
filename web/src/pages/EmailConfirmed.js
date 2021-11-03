import React from 'react';

import { Typography } from '@mui/material';

import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';

export default function EmailConfirmed() {
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
                <Typography component="p" variant="body2">
                    You can now close this tab.
                </Typography>
            </DialogWrapper>
        </PageWrapper>
    );
}