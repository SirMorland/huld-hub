import React, { useState, forwardRef, useImperativeHandle } from "react";
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';

const StyledAvatar = styled(Avatar)`
    margin-right: 32px;
    width: 128px;
    height: 128px;
`;
const ProfilePicEdit = forwardRef(({ profileImage }, ref) => {
    const [file, setFile] = useState(profileImage);

    useImperativeHandle(
        ref,
        () => ({
            getImage: () => {
                if (file) {
                    const formData = new FormData()
                    formData.append('files', file[0])
                    return formData;
                }
                else {
                    return null;
                }
            },
        }),
        [file]
    );
    return (
        <div>
            <input
                type="file" onChange={(e) => setFile(e.target.files)} id="upload"
                accept="image/*" style={{ display: "none" }}
            />
            <label htmlFor="upload">
                <IconButton aria-label="upload picture" component="span">
                    <StyledAvatar id="avatar" src={file ? URL.createObjectURL(file[0]) : null} />
                </IconButton>
            </label>
            <label htmlFor="avatar" />
        </div>
    );
})

export default ProfilePicEdit;