import { useState } from "react";

import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";
import { styled } from "@mui/system";

import Page from "../components/Page/Page";
import TextField from "../components/TextField";
import { useUserContext } from "../userContext";
import { updateUserPassword, NotFoundError } from "../api";

const Form = styled("form")`
  display: grid;
  gap: 16px;
`;

function SettingPage() {
  const { user, jwt, setJwt } = useUserContext();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let isError = false;
      if (password !== confirmPassword) {
        isError = true;
        setError("Passwords don't match!");
      }

      if (isError === false) {
        const json = await updateUserPassword(jwt, user, password);
        setJwt(json.jwt);
        setPassword("");
        setConfirmPassword("");
        setError("");
        setSuccess("Your password has been changed");
      }
    } catch (error) {
      switch (true) {
        case error instanceof NotFoundError:
          setError("Unable to change your password");
          break;
        default:
          setError("Unknown error");
          break;
      }
    }
  };

  const handleClose = () => {
      setSuccess("");
  };

  return (
    <Page>
      <Form onSubmit={handleSubmit}>
        <Typography variant="h2">
          Change your password
        </Typography>
        
        <TextField
          required
          id="new_password"
          type="password"
          label="New password"
          name="new_password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          required
          id="confirm_password"
          type="password"
          label="Confirm password"
          name="confirm_password"
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          errorText={error}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Save
        </Button>
      </Form>

      <Dialog
        open={success}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          <DialogTitle id="alert-dialog-title">{success}</DialogTitle>
          <DialogActions>
              <Button onClick={handleClose} autoFocus>
                  Close
              </Button>
          </DialogActions>
      </Dialog>
    </Page>
  );
}

export default SettingPage;
