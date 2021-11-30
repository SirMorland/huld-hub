import React, { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

import Page from "../components/Page/Page";
import useEmailDomain from "../hooks/useEmailDomain";
import useGetAllUsers from "../hooks/useGetAllUsers";
import useGetRoles from "../hooks/useGetRoles";

import { useUserContext } from "../userContext";
import SelectAutocompleteField from "../components/SelectAutocompleteField";
import ItemListEdit from "../components/ItemListEdit";
import CompetenceEdit from "../components/CompetenceEdit";
import useCompetences from "../hooks/useCompetences";
import useCompetenceCategories from "../hooks/useCompetenceCategories";
import { addCompetence, removeCompetence, updateUserRole } from "../api";

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

const COMPETENCE_TYPE = {
  languages: {
    serverName: "coding languages",
    clientName: "languages proficiencies",
  },
  keywords: "keywords",
};

function AdminPage() {
  const domain = useEmailDomain();
  const allEmailDomains = useMemo(
    () => [{ name: `@${domain}`, id: 0 }],
    [domain]
  );

  const { jwt } = useUserContext();
  const allCompetenceCategories = useCompetenceCategories(jwt);

  const allLanguages = useCompetences(
    COMPETENCE_TYPE.languages.serverName,
    jwt
  );
  const allKeywords = useCompetences(COMPETENCE_TYPE.keywords, jwt);

  const [languages, setLanguages] = useState(allLanguages || []);
  const [keywords, setKeywords] = useState(allKeywords || []);
  const [emailDomains, setEmailDomains] = useState(allEmailDomains || []);

  useEffect(() => {
    setKeywords(allKeywords);
  }, [allKeywords]);

  useEffect(() => {
    setLanguages(allLanguages);
  }, [allLanguages]);

  useEffect(() => {
    setEmailDomains(allEmailDomains);
  }, [allEmailDomains]);

  const onEmailDomainAdd = (newEmailDomain) => {
    console.log(newEmailDomain);
    // TODO: send POST request to server
    setEmailDomains((prevEmailDomains) => [
      ...prevEmailDomains,
      { name: newEmailDomain, id: prevEmailDomains.length },
    ]);
  };

  const onEmailDomainsRemove = (itemToRemove) => {
    console.log(itemToRemove);
    // TODO: send DELETE request to server
    setEmailDomains((prevItems) =>
      prevItems.filter((item) => item.id !== itemToRemove.id)
    );
  };

  const onLanguageAdd = async (newLanguage) => {
    // Prevent adding the same language
    if (
      languages.some(
        (language) =>
          language.name.toLowerCase().trim() ===
          newLanguage.toLowerCase().trim()
      )
    )
      return;

    const languageCategory = allCompetenceCategories.find(
      (category) => category.name === COMPETENCE_TYPE.languages.serverName
    );

    // Make resquest to server to add the language
    const addedLanguage = await addCompetence(
      jwt,
      newLanguage,
      languageCategory.id
    );

    // Update UI
    setLanguages((prevLanguages) => [...prevLanguages, addedLanguage]);
  };

  const onLanguageRemove = async (itemToRemove) => {

    const removedItem = await removeCompetence(jwt, itemToRemove.id)

    setLanguages((prevItems) =>
      prevItems.filter((item) => item.id !== removedItem.id)
    );
  };

  const onKeywordAdd = async (newKeyword) => {
    // Prevent adding the same keyword twice
    if (
      keywords.some(
        (keyword) =>
          keyword.name.toLowerCase().trim() === newKeyword.toLowerCase().trim()
      )
    )
      return;

    const keywordCategory = allCompetenceCategories.find(
      (category) => category.name === COMPETENCE_TYPE.keywords
    );

    // Make resquest to server to add the language
    const addedKeyword = await addCompetence(
      jwt,
      newKeyword,
      keywordCategory.id
    );

    // Update the UI
    setKeywords((prevKeywords) => [...prevKeywords, addedKeyword]);
  };

  const onKeywordRemove = async (itemToRemove) => {

    const removedItem = await removeCompetence(jwt, itemToRemove.id)

    setKeywords((prevItems) =>
      prevItems.filter((item) => item.id !== removedItem.id)
    );
  };

  const allUsers = useGetAllUsers(jwt);
  const { ADMIN, EMPLOYEE } = useGetRoles(jwt);
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

  //filtering employees from all users
  const employees = users.filter(user => user.role.type === "employee").map(user => ({
    name: user.username,
    id: user.id,
    role: user.role
  })
  );;

  //removal from Admin list
  const onRemove = async (itemNotRemoved) => {

    const itemToRemove = users.find(user => !itemNotRemoved.some(a => a.id === user.id));
    console.log(itemToRemove)
    const updatedItem = await updateUserRole(jwt, itemToRemove, EMPLOYEE?.id);
    console.log(updatedItem);
    setUsers(prevItems => prevItems.map(item => item.id === updatedItem.id ? updatedItem : item))
  }

  const onSelect = async (itemSelected) => {
    const updatedItem = await updateUserRole(jwt, itemSelected, ADMIN?.id);
    console.log(updatedItem);
    setUsers(prevItems => prevItems.map(item => item.id === updatedItem.id ? updatedItem : item))
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
        <CompetenceEdit
          type="allowed email domain"
          onRemove={onEmailDomainsRemove}
          onAdd={onEmailDomainAdd}
          items={emailDomains}
        />
      </Domains>
      <Languages>
        <CompetenceEdit
          type={COMPETENCE_TYPE.languages.clientName}
          onRemove={onLanguageRemove}
          onAdd={onLanguageAdd}
          items={languages}
        />
      </Languages>
      <Keywords>
        <CompetenceEdit
          type={COMPETENCE_TYPE.keywords}
          onRemove={onKeywordRemove}
          onAdd={onKeywordAdd}
          items={keywords}
        />
      </Keywords>
    </Page>
  );
}

export default AdminPage;
