import { DoubleFieldContainer, Grid } from "./GenericComponents";
import TextField  from "./TextField";

export default function UserBasicInfoEdit({basicInfo,setBasicInfo } ) {
    return (
      <Grid>
         <DoubleFieldContainer>
            <TextField
                required
                fullWidth
                id="first_name_Edit"
                type="text"
                label="First name"
                name="first_name"
                value={basicInfo.first_name}
                onChange={e => setBasicInfo(prev => ({...prev, first_name: e.target.value}))}
              />
           <TextField
              required
              fullWidth
              id="last_name_Edit"
              type="text"
              label="Last name"
              name="last_name"
              value={basicInfo.last_name}
              onChange={e => setBasicInfo(prev => ({...prev, last_name: e.target.value}))}
            />
          </DoubleFieldContainer>
          <DoubleFieldContainer>
            <TextField
              fullWidth
              id="title_Edit"
              type="text"
              label="Title"
              name="title"
              value={basicInfo.title}
              onChange={e => setBasicInfo(prev => ({...prev, title: e.target.value}))}
            />
          </DoubleFieldContainer>
          <DoubleFieldContainer>
            <TextField
                fullWidth
                id="address_Edit"
                type="text"
                label="Site"
                name="address"
                value={basicInfo.address}
                onChange={e => setBasicInfo(prev => ({...prev, address: e.target.value}))}
            />
            <TextField
                fullWidth
                id="phone_Edit"
                type="tel"
                label="Phone"
                name="phone"
                value={basicInfo.phone}
                onChange={e => setBasicInfo(prev => ({...prev, phone: e.target.value}))}
            />
          </DoubleFieldContainer>
          <DoubleFieldContainer>
            <TextField
                id="email_Edit"
                type="email"
                label="Email"
                name="email"
                value={basicInfo.email}
                onChange={e => setBasicInfo(prev => ({...prev, email: e.target.value}))}
            />
            <TextField
                fullWidth
                id="slack_Edit"
                type="text"
                label="Slack"
                name="slack"
                value={basicInfo.slack}
                onChange={e => setBasicInfo(prev => ({...prev, slack: e.target.value}))}
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
                onChange={e => setBasicInfo(prev => ({...prev, linkedin: e.target.value}))}
            />
            <TextField
                fullWidth
                id="github_Edit"
                type="text"
                label="GitHub"
                name="github"
                value={basicInfo.github}
                onChange={e => setBasicInfo(prev => ({...prev, github: e.target.value}))}
            />
          </DoubleFieldContainer>
      </Grid>
    );
  }

  