import { DoubleFieldContainer } from "./GenericComponents";
import TextField  from "./TextField";

function ProfileInfoEdit({edited,setEdited } ) {
    return (
        <>
         <DoubleFieldContainer>
            <TextField
                required
                fullWidth
                id="Profile_Info_Edit"
                type="text"
                Label="New_Profile_Info"
                value={edited.New_Profile_Info}
                onChange={e => setEdited(prev => ({...prev, New_Profile_Info: e.target.value}))}/>
            </DoubleFieldContainer>
            </>
    );
}

export default ProfileInfoEdit;