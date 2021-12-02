import { useState } from "react";
import Page from "../components/Page/Page";
import { Button, Grid, Divider, Typography } from "@mui/material";
import { styled } from "@mui/system";
import TextField from "../components/TextField";
import { useUserContext } from "../userContext";
import { Box } from "@mui/system";
import { updateUserPassword, NotFoundError } from "../api";

const StyledSuccess = styled(Typography)`
  color: #28a745;
`;
function SettingPage() {
  const { user, logout, jwt, setJwt } = useUserContext();
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

  return (
    <Page>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <Typography
          component="h1"
          variant="h2"
          color="primary"
          sx={{ mb: 2, width: "100%" }}
        >
          Change your password
        </Typography>

        <Grid container spacing={2} justifyContent>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="confirm_password"
              type="password"
              label="Confirm password"
              name="confirm_password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Grid item>
              <Typography component="p" variant="body2" color="error">
                {error && `${error} `}
              </Typography>
              <StyledSuccess component="p" variant="body2" colour="success">
                {success && `${success} `}
              </StyledSuccess>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Grid container spacing={2} justifyContent>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            onClick={logout}
          >
            Log out
          </Button>
        </Grid>
      </Grid>
    </Page>
  );
}

export default SettingPage;
