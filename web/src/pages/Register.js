import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';
import { fetchPost } from '../utils';
import { useHistory } from "react-router-dom";

export default function RegistrationForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        if (password !== reEnterPassword){
            setError("Passwords do not match! Please check");
        } else if (email && password && password === reEnterPassword) {
            const url = `${process.env.REACT_APP_BACKEND_HOST}/auth/local/register`;
            const body =  {
                email, password, username:email
            };
            const response = await fetchPost(url, body);
            const json = await response.json();
            console.log('json response', json);
            if (json.statusCode && json.statusCode !== 200) {
                const errorMessage = json.data[0].messages[0].message;
                setError(errorMessage);
            } else {
                // TODO: alert the user that registration completes and please check their email
                history.push('/success');
            }
        }
    };

    return (
        <PageWrapper>
            <DialogWrapper>
                <Typography component="h1" variant="h5" color="primary">
                    Register to Hub
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
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                id="reEnterPassword"
                                name="reEnterPassword"
                                label="Re-Enter Password"
                                value={reEnterPassword}
                                onChange={e => setReEnterPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <br />
                    {error && 
                    <Typography component="p" variant="body2" color="secondary">
                        {error}
                    </Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    <br />
                    <br />
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link href="/" variant="body2" color="secondary">
                                Already a member? Login instead
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </DialogWrapper>
        </PageWrapper>
    );
}