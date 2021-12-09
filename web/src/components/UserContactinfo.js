import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { mdiSlack } from "@mdi/js";
import Icon from "@mdi/react";

import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled('div')`
  display: grid;
  gap: 8px;
  grid-template-columns: max-content 1fr;
  align-items: center;

  @media screen and (min-width: 768px) {
    direction: rtl;
  }
`;

const ContactText = styled(Typography)`
  color: white;
  font-size: 16px;
  line-height: 1;
  word-break: break-word;

  @media print{
    color: black;
  }
`;

const StyledIcon = `
  width: 16px;
  height: 16px;
  vertical-align: bottom;
  color: white;
  
  @media print{
    color: black;
  }
`;

const ContactLocationIcon = styled(LocationOnIcon)(StyledIcon);
const ContactEmailIcon = styled(EmailIcon)(StyledIcon);
const ContactPhoneIcon = styled(PhoneIcon)(StyledIcon);
const ContactGithubIcon = styled(GitHubIcon)(StyledIcon);
const ContactLinkedInIcon = styled(LinkedInIcon)(StyledIcon);
const ContactMdiIcon = styled(Icon)(StyledIcon);

export default function UserContactinfo({ profile }) {
  return (
    <Container>
      {profile.address && (
        <>
          <ContactLocationIcon />
          <ContactText>{profile.address}</ContactText>
        </>
      )}
      {profile.email && (
        <>
          <ContactEmailIcon />
          <ContactText>{profile.email}</ContactText>
        </>
      )}
      {profile.phone && (
        <>
          <ContactPhoneIcon />
          <ContactText>{profile.phone}</ContactText>
        </>
      )}
      {profile.slack && (
        <>
          <ContactMdiIcon path={mdiSlack} />
          <ContactText>{profile.slack}</ContactText>
        </>
      )}
      {profile.github && (
        <>
          <ContactGithubIcon />
          <ContactText>{profile.github}</ContactText>
        </>
      )}
      {profile.linkedin && (
        <>
          <ContactLinkedInIcon />
          <ContactText>{profile.linkedin}</ContactText>
        </>
      )}
    </Container>
  );
}
