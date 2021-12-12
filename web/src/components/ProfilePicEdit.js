import React, { useState, forwardRef, useImperativeHandle } from "react";
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';

const ProfilePicEditContainer = styled("div")`
    margin: auto;
  
    @media (min-width: 768px) {
        margin: 0;
    }
`;

const StyledAvatar = styled(Avatar)`
    width: 128px;
    height: 128px;
`;

const StyledButton = styled(IconButton)`
    padding: 0;
    &:hover {
        &:after {
            display: flex;
            content: "Upload new profile image";
            font-weight: bold;
            background-color: rgba(0,0,0, 0.5);
            width: 128px;
            height: 128px;
            position: absolute;
            border-radius: 50%;
            color: white;
            font-size: 18px;
            align-items: center;
        }
    }
`;

const ProfilePicEdit = forwardRef(({ profileImage }, ref) => {
    const [file, setFile] = useState(null);
    const imageUrl = profileImage ? process.env.REACT_APP_BACKEND_HOST + profileImage.url : '';
    useImperativeHandle(
        ref,
        () => ({
            getFile: () => (file) ? file : null
        }),
        [file]
    );
    return (
        <ProfilePicEditContainer>
            <input data-testid="file-input"
                type="file" onChange={(e) => setFile(e.target.files[0])} id="upload"
                accept="image/*" style={{ display: "none" }}
            />
            <label htmlFor="upload" data-testid="file-label">
                <StyledButton aria-label="upload picture" component="span">
                    <StyledAvatar id="avatar" src={file ? URL.createObjectURL(file) : imageUrl} />
                </StyledButton>
            </label>
            <label htmlFor="avatar" />
        </ProfilePicEditContainer>
    );
})

export default ProfilePicEdit;