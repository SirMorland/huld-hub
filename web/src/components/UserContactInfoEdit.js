import { DoubleFieldContainer } from "./GenericComponents";
import TextField from "./TextField";
import React from "react";

export default function UserBasicInfoEdit({ basicInfo, setBasicInfo }) {

    return (
        <React.Fragment>
            <DoubleFieldContainer>
                <TextField
                    fullWidth
                    id="address_Edit"
                    type="text"
                    label="Site"
                    name="address"
                    value={basicInfo.address}
                    onChange={e => setBasicInfo(prev => ({ ...prev, address: e.target.value }))}
                />
                <TextField
                    fullWidth
                    id="phone_Edit"
                    type="tel"
                    label="Phone"
                    name="phone"
                    value={basicInfo.phone}
                    onChange={e => setBasicInfo(prev => ({ ...prev, phone: e.target.value }))}
                />
            </DoubleFieldContainer>
            <DoubleFieldContainer>
                <TextField
                    id="email_Edit"
                    type="email"
                    label="Email"
                    name="email"
                    value={basicInfo.email}
                    onChange={e => setBasicInfo(prev => ({ ...prev, email: e.target.value }))}
                />
                <TextField
                    fullWidth
                    id="slack_Edit"
                    type="text"
                    label="Slack"
                    name="slack"
                    value={basicInfo.slack}
                    onChange={e => setBasicInfo(prev => ({ ...prev, slack: e.target.value }))}
                />
            </DoubleFieldContainer>
            <DoubleFieldContainer>
                <TextField
                    fullWidth
                    id="linkedin_Edit"
                    type="text"
                    label="LinkedIn"
                    name="linkedin"
                    value={basicInfo.linkedin}
                    onChange={e => setBasicInfo(prev => ({ ...prev, linkedin: e.target.value }))}
                />
                <TextField
                    fullWidth
                    id="github_Edit"
                    type="text"
                    label="GitHub"
                    name="github"
                    value={basicInfo.github}
                    onChange={e => setBasicInfo(prev => ({ ...prev, github: e.target.value }))}
                />
            </DoubleFieldContainer>
        </React.Fragment>
    );
}

