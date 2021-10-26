import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Cookies from 'js-cookie';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import DialogWrapper from '../components/DialogWrapper';
import PageWrapper from '../components/PageWrapper';
import { fetchPost } from '../utils';

export default function LoginForm() {
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `${process.env.REACT_APP_BACKEND_HOST}/auth/local`;
        const body = { identifier: email, password };
        const response = await fetchPost(url, body);
        
        // TODO: add error checking
        if(response.status === 200) {   
            const json = await response.json();
            Cookies.set("hub-jwt", json.jwt);
            
            history.push(`/${json.user.id}`);
        }
    };

    return (
        <PageWrapper>
            <DialogWrapper>
                {location.search.includes('confirmed=true') && <Typography component="p" variant="body" > Your email has been confirmed. You can log in now <br/><br/></Typography>}
                <Typography component="h1" variant="h5" color="primary">
                    Log in to Hub
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                type="email"
                                label="Email Address"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                id="password"
                                name="password"
                                label="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link href="#" variant="body2" color="secondary">
                                Forgot Password?
                            </Link>
                        </Grid>
                    </Grid>
                    <br />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        LOG IN
                    </Button>
                    <br />
                    <br />
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link href="/register" variant="body2" color="secondary">
                                Not Registered? Create an account
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </DialogWrapper>
        </PageWrapper>

    );
}