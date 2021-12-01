import { DoubleFieldContainer, Grid } from "./GenericComponents";
import TextField from "./TextField";

export default function UserBasicInfoEdit({ basicInfo, setBasicInfo }) {
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
          onChange={e => setBasicInfo(prev => ({ ...prev, first_name: e.target.value }))}
        />
        <TextField
          required
          fullWidth
          id="last_name_Edit"
          type="text"
          label="Last name"
          name="last_name"
          value={basicInfo.last_name}
          onChange={e => setBasicInfo(prev => ({ ...prev, last_name: e.target.value }))}
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
          onChange={e => setBasicInfo(prev => ({ ...prev, title: e.target.value }))}
        />
      </DoubleFieldContainer>
    </Grid>
  );
}

