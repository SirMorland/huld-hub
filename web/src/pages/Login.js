import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import TextField from '../components/TextField';
import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';
import { StyledForm } from '../components/GenericComponents';
import { login, EmailOrPasswordInvalidError } from '../api';
import { useUserContext } from '../userContext';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setJwt } = useUserContext();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            const json = await login(email, password);
            setJwt(json.jwt);
        } catch (error) {
            switch (true) {
                case error instanceof EmailOrPasswordInvalidError:
                    setError("Incorrect email or password!");
                    break;
                default:
                    break;
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper>
            <DialogWrapper>
                <Typography variant="h1" align="center">
                    Log in to Hub
                </Typography>
                <StyledForm onSubmit={handleSubmit}>
                    <TextField
                        required
                        id="email"
                        type="email"
                        label="Email Address"
                        placeholder="john.doe@huld.io"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        required
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        placeholder="********"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        helpText={
                            <Link component={RouterLink} to="/forgot-password" variant="body2" color="secondary">Forgot Password?</Link>
                        }
                        errorText={error}
                    />
                    <LoadingButton
                        loading={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Log in
                    </LoadingButton>
                </StyledForm>
                <Link component={RouterLink} to="/register" variant="body2" color="secondary" align="center">
                    Not Registered? Create an account
                </Link>
            </DialogWrapper>
        </PageWrapper>
    );
}