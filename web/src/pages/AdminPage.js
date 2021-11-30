import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

import Page from "../components/Page/Page";
import ActionButtonContainer from "../components/ActionButtonContainer";
import useEmailDomain from "../hooks/useEmailDomain";
import useGetAllUsers from "../hooks/useGetAllUsers";

import { useUserContext } from "../userContext";
import AdminUserManager from "../components/AdminUserManager";
import { updateUserRole } from "../api";
import SelectAutocompleteField from "../components/SelectAutocompleteField";
import ItemListEdit from "../components/ItemListEdit";
import { getRoles } from "@testing-library/dom";

const Admins = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Domains = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Languages = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 2;
    grid-row: span 3;
  }
`;
const Keywords = styled("div")`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 3;
    grid-row: span 3;
  }
`;

function AdminPage() {
  const emailDomain = useEmailDomain();

  const { jwt } = useUserContext();
  const allUsers = useGetAllUsers(jwt);


  const [users, setUsers] = useState(allUsers || []);

  console.log(users)
  useEffect(() => {
    setUsers(allUsers)
  }, [allUsers]);

  //filtering admin from all users
  const admin = users.filter(user => user.role.type === "admin").map(user => ({
    name: user.username,
    id: user.id,
    role: user.role
  })
  );

  console.log(admin)
  //filtering employees from all users
  const employees = users.filter(user => user.role.type === "employee").map(user => ({
    name: user.username,
    id: user.id,
    role: user.role
  })
  );;

  //removal from Admin list
  const onRemove = async (itemToRemove) => {
    console.log(itemToRemove)
    const updatedItem = updateUserRole(jwt, itemToRemove, itemToRemove.role.id);
    setUsers((prevItems) => [...prevItems, updatedItem]);
  }

  const onSelect = async (itemToAdd) => {
    const updatedItem = await updateUserRole(jwt, itemToAdd.id, itemToAdd.role.id)
    setUsers((prevItems) => [...prevItems, updatedItem]);
  }

  return (
    <Page>
      <Admins>
        <Typography variant="h2" colour="primary">Admins</Typography>
        <ItemListEdit items={admin} onRemove={onRemove} />
        <SelectAutocompleteField
          options={employees}
          onSelect={onSelect}
          label="Pick an user to become Admin"
        />
      </Admins>
      <Domains>
        <Typography variant="h2" colour="primary">Allowed email domain</Typography>
        <Typography variant="p" colour="primary">{emailDomain}</Typography>
      </Domains>
      <Languages>
        <Typography variant="h2" colour="primary">Language proficiencies</Typography>
      </Languages>
      <Keywords>
        <Typography variant="h2" colour="primary">Keywords</Typography>
      </Keywords>
      <ActionButtonContainer>
        <Button fullWidth variant="contained" type="submit" color="primary">
          Save
        </Button>
      </ActionButtonContainer>
    </Page>
  );
}

export default AdminPage;
