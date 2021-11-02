import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

import { Button, Typography } from '@mui/material';

import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';

export default function AlmostDone() {
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        let fetchUser = async (jwt) => {
            const url = `${process.env.REACT_APP_BACKEND_HOST}/users/me`;
			const response = await fetch(url, {
				headers: {
					"Authorization": `Bearer ${jwt}`
				}
			});
            if(response.status === 200) {
                let json = await response.json();
                if(json.confirmed) {
                    history.replace(`/${json.id}`);
                }
            }
        }

        let jwt = Cookies.get("hub-jwt");

        if(jwt) {
            let {email} = JSON.parse(atob(jwt.split('.')[1])); //TODO: maybe use an actual jwt parser library
            setUser({email});
            fetchUser(jwt);
        }

    }, [history]);

    const sendConfirmationEmail = () => {
        console.log(user.email);
        // TODO send a post request to /auth/send-email-confirmation
        // the body is an object with {email: email}
    };

	if(!user) {
		return null;
	}

	return(
		<PageWrapper>
			<DialogWrapper>
				<Typography component="h1" variant="h5" color="primary">
					Almost done
				</Typography>
				<br/>
				<br/>
				<Typography component="p" variant="body2">
					Thank you for registering to Hub. To finish your registration, please confirm your email address by clicking the link we sent to {user.email}.
					<br/>
					<br/>
					Didn't receive the confirmation email? Please check your spam folder or try sending the email again by clicking the button below.
					<br/>
					<br/>
				</Typography>
				<Button
					type="button"
					fullWidth
					variant="contained"
					onClick={sendConfirmationEmail}
					color="primary"
					sx={{ mt: 3, mb: 2 }}
				>
					Resend confirmation email
				</Button>
			</DialogWrapper>
		</PageWrapper>
	);
}