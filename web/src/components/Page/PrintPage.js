import React from "react";
import { styled } from "@mui/system";
import { Typography } from '@mui/material';

import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import HistoryListView from "../../components/HistoryList/HistoryListView";
import ItemListView from "../../components/ItemListView";
import UserContactinfo from "../UserContactinfo";
import { Avatar } from "@mui/material";

const Container = styled("div")`
    display: none;
    @media print{
        display: block;
    }
`;

const Column1 = styled("div")`
    width: 45%;
    float: left;
    border-right: 2px solid rgb(232,232,232);
    padding-right:30px;
`;

const Column2 = styled("div")`
    width: 55%;
    float: right;
    margin-left: -1px
    border-left: 2px solid 	rgb(232,232,232);
    padding-left:40px;
`;

const StyledAvatar = styled(Avatar)`
    margin-right: 32px;
    width: 224px;
    height: 256px;
`;
const Contacts = styled('div')`
    margin-top: 40px;
`;
const Skills = styled('div')`
    margin-top: 40px;
`;
const Languages = styled("div")`
    margin-top: 40px;
`;
const Keywords = styled("div")`
    margin-top: 40px;
`;
const Bio = styled("div")`
    margin-top: 40px;
`;
const Work = styled("div")`
    margin-top: 40px;
`;
const Education = styled("div")`
    margin-top: 40px;
`;
const StyledHeader = styled(Typography)(({ theme }) => `
  font-weight: bold;
  color: black;
  font-size: 48px;
  font-family: ${theme.fonts.header};
`);
const StyledSubHeader = styled(Typography)(({ theme }) => `
  color: black;
  font-size: 32px;
  font-family: ${theme.fonts.header};
`);


function PrintPage(profile) {
    const { languages, keywords, educationHistory, workHistory } = profile;
    return (
        <Container>
            <Column1>
                <StyledAvatar
                    alt="Profile Picture"
                    src={profile.image && `${process.env.REACT_APP_BACKEND_HOST}${profile.image.formats.small.url}`}
                    data-testid="avatar"
                    variant="square"
                />
                <Contacts>
                    <UserContactinfo  profile={profile} iconSide={"left"}  ></UserContactinfo>
                </Contacts>
                <Skills>
                    <ProfileInfo title="Skills" data={profile && profile.skills} />
                </Skills>
                <Languages>
                    <ItemListView title="Language proficiencies" items={languages} noItemDescription="No Language Proficiencies Provided" />
                </Languages>
                <Keywords>
                    <ItemListView List title="Keywords" items={keywords} noItemDescription="No Keywords Provided" />
                </Keywords>
            </Column1>
            <Column2>
                <StyledHeader>
                    {profile.first_name} {profile.last_name}
                </StyledHeader>
                <StyledSubHeader>
                    {profile.title}
                </StyledSubHeader>
                <Bio>
                    <ProfileInfo title="Bio" data={profile && profile.bio} />
                </Bio>
                <Work>
                    <HistoryListView
                        title={workHistory.title}
                        historyItems={workHistory.historyItems}
                        noItemDescription={workHistory.noItemDescription}
                    />
                </Work>
                <Education>
                    <HistoryListView
                        title={educationHistory.title}
                        historyItems={educationHistory.historyItems}
                        noItemDescription={educationHistory.noItemDescription}
                    />
                </Education>
            </Column2>
        </Container>
    );
};

export default PrintPage;