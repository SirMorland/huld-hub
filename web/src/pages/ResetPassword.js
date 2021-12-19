import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import { Button, Typography } from '@mui/material';

import TextField from '../components/TextField';
import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';
import { StyledForm } from '../components/GenericComponents';
import { resetPassword } from '../api';

export default function ResetPasswordForm() {

    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const history = useHistory();
    const location = useLocation();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setPasswordError('');
        let searchParams = new URLSearchParams(location.search);
        const code = searchParams.get("code");

        if (password !== reEnterPassword){
            setPasswordError("Passwords do not match! Please check");
        } else if (password && password === reEnterPassword) {
            try {
                const json = await resetPassword(code,password, reEnterPassword);
                if (json){
                    history.push("/password-changed");
                }
            } catch (error) {
                setPasswordError("Encountered an error when attempting to change password");
            }
        }
    };

    return (
        <PageWrapper>
            <DialogWrapper>
                <Typography variant="h1" align="center">
                    Reset password
                </Typography>
                <StyledForm onSubmit={handleSubmit}>
                    <TextField
                        required
                        type="password"
                        id="password"
                        name="password"
                        label="New Password"
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Reset
                    </Button>
                </StyledForm>
                <br />
            </DialogWrapper>
        </PageWrapper>
    );
}