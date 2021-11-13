import { TextField } from "@mui/material";
import { DoubleFieldContainer } from "./GenericComponents";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const LabelText = styled(Typography)`
  font-size: 15px;
  padding-top: 15px;
`;


export default function UserBasicInfoEdit({edited,setEdited } ) {
    return (
      <div>
         <DoubleFieldContainer>
           <div>
           <LabelText>First name</LabelText>
            <TextField
                required
                fullWidth
                id="first_name_Edit"
                data-testid="first_name_Edit_test"
                type="text"
                name="first_name"
                value={edited.first_name}
                onChange={e => setEdited(prev => ({...prev, first_name: e.target.value}))}
              />
           </div>
           <div>
           <LabelText>Last name</LabelText>
           <TextField
              required
              fullWidth
              id="last_name_Edit"
              data-testid="last_name_Edit_test"
              type="text"
              name="last_name"
              value={edited.last_name}
              onChange={e => setEdited(prev => ({...prev, last_name: e.target.value}))}
            />
           </div>
          </DoubleFieldContainer>
          <DoubleFieldContainer>
            <div>
            <LabelText>Title</LabelText>
              <TextField
              required
              fullWidth
              id="title_Edit"
              data-testid="title_Edit_test"
              type="text"
              name="title"
              value={edited.title}
              onChange={e => setEdited(prev => ({...prev, title: e.target.value}))}
            />
            </div>
          </DoubleFieldContainer>
          <DoubleFieldContainer>
            <div>
                <LabelText>Address</LabelText>
                <TextField
                    required
                    fullWidth
                    id="address_Edit"
                    data-testid="address_Edit_test"
                    type="text"
                    name="address"
                    value={edited.address}
                    onChange={e => setEdited(prev => ({...prev, address: e.target.value}))}
                />
            </div>
            <div>
                <LabelText>Phone</LabelText>
                <TextField
                    required
                    fullWidth
                    id="phone_Edit"
                    data-testid="phone_Edit_test"
                    type="text"
                    name="phone"
                    value={edited.phone}
                    onChange={e => setEdited(prev => ({...prev, phone: e.target.value}))}
                />
            </div>
          </DoubleFieldContainer>
          <DoubleFieldContainer>
          <div>
                <LabelText>Email</LabelText>
                <TextField
                    required
                    fullWidth
                    id="email_Edit"
                    data-testid="email_Edit_test"
                    type="text"
                    name="email"
                    value={edited.email}
                    onChange={e => setEdited(prev => ({...prev, email: e.target.value}))}
                />
            </div>
        
              <div>
                <LabelText>Slack</LabelText>
                <TextField
                    required
                    fullWidth
                    id="slack_Edit"
                    data-testid="slack_Edit_test"
                    type="text"
                    name="slack"
                    value={edited.slack}
                    onChange={e => setEdited(prev => ({...prev, slack: e.target.value}))}
                />
            </div>
          </DoubleFieldContainer>
          <DoubleFieldContainer>
          <div>
                <LabelText>LinkedIn</LabelText>
                <TextField
                    required
                    fullWidth
                    id="linkedin_Edit"
                    data-testid="linkedin_Edit_test"
                    type="text"
                    name="linkedin"
                    value={edited.linkedin}
                    onChange={e => setEdited(prev => ({...prev, linkedin: e.target.value}))}
                />
            </div>
          
              <div>
                <LabelText>Github</LabelText>
                <TextField
                    required
                    fullWidth
                    id="github_Edit"
                    data-testid="github_Edit_test"
                    type="text"
                    name="github"
                    value={edited.github}
                    onChange={e => setEdited(prev => ({...prev, github: e.target.value}))}
                />
            </div>
          </DoubleFieldContainer>
      </div>
    );
  }