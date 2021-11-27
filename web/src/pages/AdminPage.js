import React from "react";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

import Page from "../components/Page/Page";
import ActionButtonContainer from "../components/ActionButtonContainer";
import useEmailDomain from "../hooks/useEmailDomain";

const Admins = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Domains = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Languages = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 2;
    grid-row: span 3;
  }
`;
const Keywords = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 3;
    grid-row: span 3;
  }
`;

function AdminPage() {
  const emailDomain = useEmailDomain();

  return (
    <Page>
      <Admins>
        <Typography variant="h2" colour="primary">Admins</Typography>
      </Admins>
      <Domains>
        <Typography variant="h2" colour="primary">Allowed email domain</Typography>
        <Typography variant="p" colour="primary">{emailDomain}</Typography>
      </Domains>
      <Languages>
        <Typography variant="h2" colour="primary">Language proficiencies</Typography>
      </Languages>
      <Keywords>
        <Typography variant="h2" colour="primary">Keywords</Typography>
      </Keywords>
      <ActionButtonContainer>
        <Button fullWidth variant="contained" type="submit" color="primary">
          Save
        </Button>
      </ActionButtonContainer>
    </Page>
  );
}

export default AdminPage;
