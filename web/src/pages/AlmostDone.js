import React, { useEffect, useState } from 'react';

import { Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useUserContext } from '../userContext';
import PageWrapper from '../components/PageWrapper';
import DialogWrapper from '../components/DialogWrapper';
import { sendConfirmationEmail } from '../api';

export default function AlmostDone() {

	// Get the user and jwt token from the cookies
	const { jwt } = useUserContext();

	const [email, setEmail] = useState(null);
	const [open, setOpen] = React.useState(false);
	const [SendError, setSendError] = useState('');

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		// Extract the email from the jwt token to be used for resending confirm email
		try{
			let { email } = JSON.parse(atob(jwt.split('.')[1])); //TODO: maybe use an actual jwt parser library
			setEmail(email);
		}catch (error){
			setEmail('.');
		}
	
	}, [jwt]);

	const HandleSendConfirmationEmail = async () => {
		//console.log(email);
		// send a post request to /auth/send-email-confirmation
		// the body is an object with {email: email}
		setSendError('');
		try {
			const json = await sendConfirmationEmail(email);
			if (json) {
				setOpen(true);
			}
		} catch (error) {
			setSendError('Encountered an error when attempting to send email');
		}

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
					onClick={HandleSendConfirmationEmail}
					color="primary"
					sx={{ mt: 3, mb: 2 }}
				>
					Resend confirmation email
				</Button>
				{SendError &&
					<React.Fragment>
						<Typography component="p" variant="body2" color="error">
							{SendError}
						</Typography>
					</React.Fragment>
				}
			</DialogWrapper>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Email has been sent"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText color="text" id="alert-dialog-description">
						Confirmation email should arrive shortly.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</PageWrapper>
	);
}