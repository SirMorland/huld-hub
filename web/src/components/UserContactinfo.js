import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { mdiSlack } from '@mdi/js';
import Icon from '@mdi/react'

import React from 'react';
import { Typography } from '@mui/material'; 
import { styled } from '@mui/system';

const ContactText =  styled(Typography)`
    margin-top: -3px;
    color: white;
    text-align: right;
    font-size: 14px;
`;

const ContactLocationIcon =  styled(LocationOnIcon)`
    fill: white;
    position: relative;
    top: 5px;
    right: 5px;
    left: 0px;
    transform: scale(0.8);
`;

const ContactEmailIcon =  styled(EmailIcon)`
    fill: white;
    position: relative;
    top: 7px;
    right: 5px;
    left: 2px;
    transform: scale(0.8);
`;

const ContactPhoneIcon =  styled(PhoneIcon)`
    fill: white;
    position: relative;
    top: 5px;
    right: 5px;
    left: 2px;
    transform: scale(0.8);
`;

const ContactGithubIcon =  styled(GitHubIcon)`
    fill: white;
    position: relative;
    top: 6px;
    right: 5px;
    left: 2px;
    transform: scale(0.8);
`;

const ContactLinkedInIcon =  styled(LinkedInIcon)`
    fill: white;
    position: relative;
    top: 6px;
    right: 5px;
    left: 2px;
    transform: scale(0.8);
`;

const ContactMdiIcon =  styled(Icon)`
    vertical-align: text-bottom;
    margin-top: 4px;
`;



export default function UserContactinfo(profile) {
    return (
        <div>
            <ContactText>{profile.address} <ContactLocationIcon /></ContactText>
            <ContactText>{profile.email} <ContactEmailIcon /></ContactText>
            <ContactText>{profile.phone} <ContactPhoneIcon /></ContactText>
            <ContactText>{profile.slack} <ContactMdiIcon path={mdiSlack} size={0.8} color="white"/></ContactText>
            <ContactText>{profile.github} <ContactGithubIcon /></ContactText>
            <ContactText>{profile.linkedin} <ContactLinkedInIcon /></ContactText>
        </div>
    ); 
}