import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, Typography } from '@mui/material';

import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';
import { useUserContext } from '../userContext';

export default function EmailConfirmed() {
    const { user } = useUserContext();
    return (
        <PageWrapper>
            <DialogWrapper>
                <Typography variant="h1" align="center">
                    Email confirmed
                </Typography>
                <div>
                    <Typography component="p" variant="body2" align="center">
                        Your registration to Hub is now completed!
                    </Typography>
                    <Typography component="p" variant="body2" align="center">
                        Finish up by filling your profile with your information.
                    </Typography>
                </div>
                {user ?
                    <Link component={RouterLink} to={`/profile/${user.profileId}`} variant="body2" color="secondary" align="center">
                        Go to my profile
                    </Link> 
                :
                    <Link component={RouterLink} to="/login" variant="body2" color="secondary" align="center">
                        Go to login page
                    </Link>
                }
            </DialogWrapper>
        </PageWrapper>
    );
}