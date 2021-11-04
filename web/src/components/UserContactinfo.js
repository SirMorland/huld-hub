import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import { mdiSlack } from '@mdi/js';
import Icon from '@mdi/react'

const p = {
    margin: 0,
    color: "white",
    font: "Fira Sans",
    textAlign: "right",
    fontSize: "16px"
};

const icons = {
    fill: "white",
    position: "relative",
    top: "5px",
    right: "5px",
    left: "2px",
    transform: "scale(0.8)"
}


export default function UserContactinfo(profile) {
        return (
            <div>
                <p style={p}>{profile.address} <LocationOnIcon style={icons} /></p>
                <p style={p}>{profile.email} <EmailIcon style={icons} /></p>
                <p style={p}>{profile.phone} <PhoneIcon style={icons} /></p>
                <p style={p}>{profile.slack} <Icon path={mdiSlack} size={0.8} color="white" style={{verticalAlign: "text-bottom"}} /></p>
                <p style={p}>{profile.github} <GitHubIcon style={icons} /></p>
            </div>
        );
   
}