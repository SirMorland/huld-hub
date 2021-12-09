import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from "react-router-dom";

import { LoadingButton } from '@mui/lab';
import { Link, Typography } from '@mui/material';

import TextField from '../components/TextField';
import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';
import { StyledForm } from '../components/GenericComponents';
import { register, EmailTakenError, EmailWrongDomainError } from '../api';
import { useUserContext } from '../userContext';

export default function RegistrationForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { setJwt } = useUserContext();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setEmailError('');
        setPasswordError('');


        if (password !== reEnterPassword) {
            setPasswordError("Passwords do not match! Please check");
        } else if (email && password && password === reEnterPassword) {
            try {        
                setLoading(true);
                const json = await register(email, password);
                setJwt(json.jwt);
                history.push("/almost-done");
            } catch (error) {
                switch (true) {
                    case error instanceof EmailWrongDomainError:
                        setEmailError(error.message);
                        break;
                    case error instanceof EmailTakenError:
                        setEmailError("Email already taken!");
                        break;
                    default:
                        setPasswordError(error.message);
                        break;
                }
            } finally{
                setLoading(false);
            }
        }
    };

    return (
        <PageWrapper>
            <DialogWrapper>
                <Typography variant="h1" align="center">
                    Register to Hub
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
                        errorText={emailError}
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
                    />
                    <TextField
                        required
                        type="password"
                        id="reEnterPassword"
                        name="reEnterPassword"
                        label="Re-Enter Password"
                        placeholder="********"
                        value={reEnterPassword}
                        onChange={e => setReEnterPassword(e.target.value)}
                        errorText={passwordError}
                    />
                    <LoadingButton
                        loading={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Register
                    </LoadingButton>
                </StyledForm>
                <Link component={RouterLink} to="/login" variant="body2" color="secondary" align="center">
                    Already a member? Login instead
                </Link>
            </DialogWrapper>
        </PageWrapper>
    );
}