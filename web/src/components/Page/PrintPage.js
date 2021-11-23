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
    height: auto;
    @page {
        size: auto;
        margin: 8mm 8mm 8mm 8mm;  
    }
    @media print{
       display: block;
    }
`;
const Column1 = styled("div")`
    width: 45%;
    height: 100%;
    float: left;
    padding-right:30px;
`;
const Column2 = styled("div")`
    width: 55%;
    height: 100%;
    float: right;
    border-left: 2px solid 	rgb(232,232,232);
    padding-left:40px;
`;
const StyledAvatar = styled(Avatar)`
    margin-right: 32px;
    width: 224px;
    height: 256px;
`;
const TextContainer = styled('div')`
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
                {profile.image && (
                <StyledAvatar
                    alt="Profile Picture"
                    src={`${process.env.REACT_APP_BACKEND_HOST}${profile.image.url}`}
                    data-testid="avatar"
                    variant="square"
                />)}
                <TextContainer>
                    <UserContactinfo  profile={profile} iconSide={"left"}  ></UserContactinfo>
                </TextContainer>
                <TextContainer>
                    <ProfileInfo title="Skills" data={profile.skills} />
                </TextContainer>
                {languages && languages.length > 0 && (
                <TextContainer>
                    <ItemListView title="Language proficiencies" items={languages} />
                </TextContainer>)}
                {keywords && keywords.length > 0 && (
                <TextContainer>
                    <ItemListView List title="Keywords" items={keywords} />
                </TextContainer>)}
            </Column1>
            <Column2>
                <StyledHeader>
                    {profile.first_name} {profile.last_name}
                </StyledHeader>
                <StyledSubHeader>
                    {profile.title}
                </StyledSubHeader>
                <TextContainer>
                    <ProfileInfo data={profile && profile.bio} />
                </TextContainer>
                {workHistory.historyItems && workHistory.historyItems.length > 0 && (
                <TextContainer>
                    <HistoryListView
                        title={workHistory.title}
                        historyItems={workHistory.historyItems}
                    />
                </TextContainer>)}
                {educationHistory.historyItems && educationHistory.historyItems.length > 0 && (
                <TextContainer>
                    <HistoryListView
                        title={educationHistory.title}
                        historyItems={educationHistory.historyItems}
                    />
                </TextContainer>)}
            </Column2>
        </Container>
    );
};

export default PrintPage;