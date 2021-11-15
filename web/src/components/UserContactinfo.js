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
`;

const ContactText = styled(Typography)`
  color: white;
  text-align: right;
  font-size: 16px;
  line-height: 1;
`;

const StyledIcon = `
  width: 16px;
  height: 16px;
  vertical-align: bottom;
  margin-left: 8px;
`;

const ContactLocationIcon = styled(LocationOnIcon)(StyledIcon);
const ContactEmailIcon = styled(EmailIcon)(StyledIcon);
const ContactPhoneIcon = styled(PhoneIcon)(StyledIcon);
const ContactGithubIcon = styled(GitHubIcon)(StyledIcon);
const ContactLinkedInIcon = styled(LinkedInIcon)(StyledIcon);
const ContactMdiIcon = styled(Icon)(StyledIcon);

export default function UserContactinfo(profile) {
  return (
    <Container>
      {profile.address && (
        <ContactText>
          {profile.address}<ContactLocationIcon />
        </ContactText>
      )}
      {profile.email && (
        <ContactText>
          {profile.email}<ContactEmailIcon />
        </ContactText>
      )}
      {profile.phone && (
        <ContactText>
          {profile.phone}<ContactPhoneIcon />
        </ContactText>
      )}
      {profile.slack && (
        <ContactText>
          {profile.slack}<ContactMdiIcon path={mdiSlack} />
        </ContactText>
      )}
      {profile.github && (
        <ContactText>
          {profile.github}<ContactGithubIcon />
        </ContactText>
      )}
      {profile.linkedin && (
        <ContactText>
          {profile.linkedin}<ContactLinkedInIcon />
        </ContactText>
      )}
    </Container>
  );
}
