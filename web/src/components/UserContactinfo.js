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

const ContactText = styled(Typography)`
  margin-top: -3px;
  color: white;
  text-align: right;
  font-size: 14px;
`;

const ContactLocationIcon = styled(LocationOnIcon)`
  fill: white;
  position: relative;
  top: 5px;
  right: 5px;
  left: 0px;
  transform: scale(0.8);
`;

const ContactEmailIcon = styled(EmailIcon)`
  fill: white;
  position: relative;
  top: 7px;
  right: 5px;
  left: 2px;
  transform: scale(0.8);
`;

const ContactPhoneIcon = styled(PhoneIcon)`
  fill: white;
  position: relative;
  top: 5px;
  right: 5px;
  left: 2px;
  transform: scale(0.8);
`;

const ContactGithubIcon = styled(GitHubIcon)`
  fill: white;
  position: relative;
  top: 6px;
  right: 5px;
  left: 2px;
  transform: scale(0.8);
`;

const ContactLinkedInIcon = styled(LinkedInIcon)`
  fill: white;
  position: relative;
  top: 6px;
  right: 5px;
  left: 2px;
  transform: scale(0.8);
`;

const ContactMdiIcon = styled(Icon)`
  vertical-align: text-bottom;
  margin-top: 4px;
  margin-left: 8px;
`;

export default function UserContactinfo(profile) {
  return (
    <div>
      {profile.address && (
        <ContactText>
          {profile.address} <ContactLocationIcon />
        </ContactText>
      )}
      {profile.email && (
        <ContactText>
          {profile.email} <ContactEmailIcon />
        </ContactText>
      )}
      {profile.phone && (
        <ContactText>
          {profile.phone} <ContactPhoneIcon />
        </ContactText>
      )}
      {profile.slack && (
        <ContactText>
          {profile.slack}{" "}
          <ContactMdiIcon path={mdiSlack} size={0.8} color="white" />
        </ContactText>
      )}
      {profile.github && (
        <ContactText>
          {profile.github} <ContactGithubIcon />
        </ContactText>
      )}
      {profile.linkedin && (
        <ContactText>
          {profile.linkedin} <ContactLinkedInIcon />
        </ContactText>
      )}
    </div>
  );
}
