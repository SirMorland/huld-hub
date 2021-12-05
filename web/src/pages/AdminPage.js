import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

import Page from '../components/Page/Page';
import useEmailDomains from '../hooks/useEmailDomains';
import useGetAllUsers from '../hooks/useGetAllUsers';
import useGetRoles from '../hooks/useGetRoles';
import useUser from '../hooks/useUser';

import { useUserContext } from '../userContext';
import SelectAutocompleteField from '../components/SelectAutocompleteField';
import ItemListEdit from '../components/ItemListEdit';
import CompetenceEdit from '../components/CompetenceEdit';
import EmailDomainEdit from '../components/EmailDomainEdit';
import useCompetences from '../hooks/useCompetences';
import useCompetenceCategories from '../hooks/useCompetenceCategories';
import { addCompetence, removeCompetence, updateUserRole, addEmailDomain, removeEmailDomain } from '../api';

const Admins = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Domains = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 2;
  }
  @media (min-width: 1152px) {
    grid-column-start: 1;
  }
`;
const Languages = styled('div')`
  @media (min-width: 768px) {
    grid-column-start: 1;
  }
  @media (min-width: 1152px) {
    grid-column-start: 2;
    grid-row: span 3;
  }
`;
const Keywords = styled('div')`
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
    serverName: 'coding languages',
    clientName: 'languages proficiencies',
  },
  keywords: 'keywords',
};

function AdminPage() {
  const { jwt } = useUserContext();
  const allEmailDomains = useEmailDomains(jwt);
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

  const onEmailDomainAdd = async (type, newEmailDomain) => {
    const newAllowedDomain = {type, domain: newEmailDomain}
    const addedEmailDomain = await addEmailDomain(jwt, newAllowedDomain)

    setEmailDomains((prevEmailDomains) => [
      ...prevEmailDomains,
      addedEmailDomain,
    ]);
  };

  const onEmailDomainsRemove = async (itemToRemove) => {
    const removedDomain = await removeEmailDomain(jwt, itemToRemove.id)
    setEmailDomains((prevItems) =>
      prevItems.filter((item) => item.id !== removedDomain.id)
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
    const removedItem = await removeCompetence(jwt, itemToRemove.id);

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
    const removedItem = await removeCompetence(jwt, itemToRemove.id);

    setKeywords((prevItems) =>
      prevItems.filter((item) => item.id !== removedItem.id)
    );
  };

  const allUsers = useGetAllUsers(jwt);
  const { ADMIN, EMPLOYEE } = useGetRoles(jwt);
  const [users, setUsers] = useState(allUsers || []);
  const user = useUser(jwt);

  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  //filtering admin from all users
  const admin = users
    .filter((user) => user.role.type === 'admin')
    .map((user) => ({
      name: user.username,
      id: user.id,
      role: user.role,
    }));

  //filtering employees from all users
  const employees = users
    .filter((user) => user.role.type === 'employee')
    .map((user) => ({
      name: user.username,
      id: user.id,
      role: user.role,
    }));

  //removal from Admin list
  const onRemove = async (demotedUser) => {
    //user is not able to demote himself
    if (demotedUser.id === user.id) {
      alert("User is not able to demote himself.")
      return;
    }
    const updatedItem = await updateUserRole(jwt, demotedUser, EMPLOYEE?.id);
    console.log(updatedItem);
    setUsers((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const onSelect = async (itemSelected) => {
    const updatedItem = await updateUserRole(jwt, itemSelected, ADMIN?.id);
    console.log(updatedItem);
    setUsers((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  return (
    <Page>
      <Admins>
        <Typography variant="h2" colour="primary">
          Admins
        </Typography>
        <ItemListEdit items={admin} onRemove={onRemove} />
        <SelectAutocompleteField
          options={employees}
          onSelect={onSelect}
          label="Pick an user to become Admin"
        />
      </Admins>
      <Domains>
        <EmailDomainEdit
          onRemove={onEmailDomainsRemove}
          onAdd={onEmailDomainAdd}
          emailDomains={emailDomains}
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
