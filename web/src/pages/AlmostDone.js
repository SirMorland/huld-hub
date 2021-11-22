import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import { Button, Typography } from '@mui/material';

import { useUserContext } from '../userContext';
import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';

export default function AlmostDone() {

  // Get the user and jwt token from the cookies
	const { user, jwt } = useUserContext();

	const history = useHistory();

	const [email, setEmail] = useState(null);

	useEffect(() => {
    // Check if there is a valid jwt token
    if (jwt) {
      // Extract the email from the jwt token to be used for resending confirm email
			let { email } = JSON.parse(atob(jwt.split('.')[1])); //TODO: maybe use an actual jwt parser library
			setEmail(email);
		} else {
      // If no jwt token available, redirect to login page
			history.push("/login");
		}
	}, [history, jwt]);

	useEffect(() => {
    // If there is a user, redirect to the profile page of the user
		if (user) {
			history.push(`/profile/${user.profileId}`);
		}
	}, [user, history]);

	const sendConfirmationEmail = () => {
		console.log(email);
		// TODO send a post request to /auth/send-email-confirmation
		// the body is an object with {email: email}
	};

	return (
		<PageWrapper>
			<DialogWrapper>
				<Typography component="h1" variant="h5" color="primary">
					Almost done
				</Typography>
				<br />
				<br />
				<Typography component="p" variant="body2">
					Thank you for registering to Hub. To finish your registration, please confirm your email address by clicking the link we sent to {email}.
					<br />
					<br />
					Didn't receive the confirmation email? Please check your spam folder or try sending the email again by clicking the button below.
					<br />
					<br />
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