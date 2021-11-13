import { DoubleFieldContainer } from "./GenericComponents";
import TextField  from "./TextField";

export default function UserBasicInfoEdit({edited,setEdited } ) {
    return (
      <>
         <DoubleFieldContainer>
            <TextField
                required
                fullWidth
                id="first_name_Edit"
                type="text"
                label="first name"
                name="first_name"
                value={edited.first_name}
                onChange={e => setEdited(prev => ({...prev, first_name: e.target.value}))}
              />
           <TextField
              required
              fullWidth
              id="last_name_Edit"
              type="text"
              label="Last name"
              name="last_name"
              value={edited.last_name}
              onChange={e => setEdited(prev => ({...prev, last_name: e.target.value}))}
            />
          </DoubleFieldContainer>
          <DoubleFieldContainer>
            <TextField
              fullWidth
              id="title_Edit"
              type="text"
              label="Title"
              name="title"
              value={edited.title}
              onChange={e => setEdited(prev => ({...prev, title: e.target.value}))}
            />
          </DoubleFieldContainer>
          <DoubleFieldContainer>
            <TextField
                fullWidth
                id="address_Edit"
                type="text"
                label="Site"
                name="address"
                value={edited.address}
                onChange={e => setEdited(prev => ({...prev, address: e.target.value}))}
            />
            <TextField
                fullWidth
                id="phone_Edit"
                type="text"
                label="Phone"
                name="phone"
                value={edited.phone}
                onChange={e => setEdited(prev => ({...prev, phone: e.target.value}))}
            />
          </DoubleFieldContainer>
          <DoubleFieldContainer>
            <TextField
                id="email_Edit"
                type="text"
                label="Email"
                name="email"
                value={edited.email}
                onChange={e => setEdited(prev => ({...prev, email: e.target.value}))}
            />
            <TextField
                fullWidth
                id="slack_Edit"
                type="text"
                label="Slack"
                name="slack"
                value={edited.slack}
                onChange={e => setEdited(prev => ({...prev, slack: e.target.value}))}
            />
          </DoubleFieldContainer>
          <DoubleFieldContainer>
            <TextField
                fullWidth
                id="linkedin_Edit"
                type="text"
                label="LinkedIn"
                name="linkedin"
                value={edited.linkedin}
                onChange={e => setEdited(prev => ({...prev, linkedin: e.target.value}))}
            />
            <TextField
                fullWidth
                id="github_Edit"
                type="text"
                label="Github"
                name="github"
                value={edited.github}
                onChange={e => setEdited(prev => ({...prev, github: e.target.value}))}
            />
          </DoubleFieldContainer>
      </>
    );
  }