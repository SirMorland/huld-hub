import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    body: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #00173A 50%, #ffffff 50%)',
    },
    form: {
        background: 'linear-gradient(to top, #ffffff 50%, #ffffff 50%)',
        position: 'absolute',
        display: 'block',
        top: '25%',
        left: '30%',
        marginTop: '20px',
        marginBottom: '24px',
        borderRadius: '5px',
        border: '2px solid #000000',
    },
});

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const classes = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (

        <Container component="main" maxWidth="xs" className={classes.form}>

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

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
            </Box>
        </Container>

    );
}