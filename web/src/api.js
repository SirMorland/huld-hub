import qs from 'qs';
import { fetchPost } from './utils';
export const login = async (email, password) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/auth/local`;
  const body = { identifier: email, password };

  const response = await fetchPost(url, body);
  switch (response.status) {
    case 200:
      return await response.json();
    case 400:
      throw new EmailOrPasswordInvalidError();
    default:
      throw new Error(response.status);
  }
};

/**
 * Promote users, demote users, add and remove keywords + coding languages
 * @param {Object} param0
 * @param {String} param0.jwt valid JWT
 * @param {Array<{id}>} param0.adminUsers list of users to be added as admin
 * @param {Array<{id}>} param0.employeeUsers list of users to be demote from admin
 * @param {Array<{name:string}>} param0.keywords list of keywords to be added
 * @param {Array<{name:string}>} param0.codingLanguages list of coding languages to be added
 * @param {Array<{id:string}>} param0.removedKeywords list of keywords to be removed
 * @param {Array<{id:string}>} param0.removedCodingLanguages list of coding languages to be removed
 */
export const onAdminPageSave = async ({
  jwt,
  adminUsers,
  employeeUsers,
  keywords,
  keywordsToBeRemoved,
  codingLanguages,
  codingLanguagesToBeRemoved,
}) => {
  // fetch roles
  const roles = await getRoles(jwt);
  const adminRole = roles.find((role) => role.type === 'admin');
  const employeeRole = roles.find((role) => role.type === 'employee');
  // implement save users that are promoted to be admins
  const promotionPromises = adminUsers.map((user) =>
    updateUserRole(jwt, user.id, adminRole.id)
  );
  // save users that are demoted from being admins
  const demotionPromises = employeeUsers.map((user) =>
    updateUserRole(jwt, user.id, employeeRole.id)
  );

  const categories = await getCompetenceCategories(jwt);
  const codingLanguageCategory = categories.find(
    (category) => category.name === 'coding-languages'
  );
  const keywordsCategory = categories.find(
    (category) => category.name === 'keywords'
  );
  // new keywords
  const newKeywordsPromises = keywords.map((keyword) =>
    addCompetence(jwt, keyword, keywordsCategory.id)
  );
  // remove keywords
  const removeKeywordsPromises = keywordsToBeRemoved.map((keyword) =>
    removeCompetence(jwt, keyword)
  );
  // save coding languages
  const newCodingLanguagePromises = codingLanguages.map((codingLanguage) =>
    addCompetence(jwt, codingLanguage, codingLanguageCategory.id)
  );
  // remove coding languages
  const removeCodingLanguagePromises = codingLanguagesToBeRemoved.map(
    (codingLanguage) => removeCompetence(jwt, codingLanguage)
  );

  await Promise.all([
    ...promotionPromises,
    ...demotionPromises,
    ...newKeywordsPromises,
    ...removeKeywordsPromises,
    ...newCodingLanguagePromises,
    ...removeCodingLanguagePromises,
  ]);
};

/**
 * Fetch all users
 * @param {string} jwt authoriazation token
 */
export const getAllUsers = async (jwt) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/users`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return await handleBasicReponse(response);
};

/**
 * update input user with a new role
 * @param {string} jwt authoriazation token
 * @param {Object.<id:string | number>} user object for updating
 * @param {string} id of the user role to be updated
 */
export const updateUserRole = async (jwt, user, role) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/users/${user.id}`;
  const body = { role };
  const response = await fetchPost(url, body, jwt, 'PUT');
  return await handleBasicReponse(response);
};

/**
 * get all user roles
 * @param {string} jwt authoriazation token
 */
export const getRoles = async (jwt) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/users-permissions/roles`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return await handleBasicReponse(response);
};

/**
 * Add a new competence with name and category
 * @param {string} jwt authoriazation token
 * @param {string} competence name
 * @param {string} id of the category
 */
export const addCompetence = async (jwt, name, category) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/competences`;
  const body = {
    name,
    description: name,
    category,
  };
  const response = await fetchPost(url, body, jwt);
  return await handleBasicReponse(response);
};

/**
 * Remove a new competence by its id
 * @param {string} jwt authoriazation token
 * @param {string} id competence id
 */
export const removeCompetence = async (jwt, id) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/competences/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return await handleBasicReponse(response);
};

export const register = async (email, password) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/auth/local/register`;
  const body = {
    email,
    password,
    username: email,
  };

  const response = await fetchPost(url, body);
  switch (response.status) {
    case 200:
      return await response.json();
    case 400:
      const json = await response.json();
      const message = json.data[0].messages[0];
      switch (message.id) {
        case 'Auth.form.error.email.format':
          throw new EmailWrongDomainError(message.message);
        case 'Auth.form.error.email.taken':
          throw new EmailTakenError();
        default:
          throw new Error(json.data[0].message[0].message);
      }
    default:
      throw new Error(response.status);
  }
};

export const getProfileById = async (id, jwt) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/user-profiles/${id}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  switch (response.status) {
    case 200:
      return await response.json();
    case 401:
      throw new UnauthorizedError();
    case 404:
      throw new NotFoundError();
    default:
      throw new Error(response.status);
  }
};

export const postProfile = async (profile, jwt) => {
  // TODO: implement this
  const url = `${process.env.REACT_APP_BACKEND_HOST}/user-profiles/${profile.id}`;
  const response = await fetchPost(url, profile, jwt, 'PUT');
  return await handleBasicReponse(response);
};

export const uploadPicture = async (file, jwt) => {
  const body = new FormData();
  body.append('files', file);
  const url = `${process.env.REACT_APP_BACKEND_HOST}/upload`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body,
  });
  return await handleBasicReponse(response);
};

export const getCompetenceCategories = async (jwt) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/competence-categories?name=keywords&name=coding%20languages`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return await handleBasicReponse(response);
};

export const getCategoryCompetences = async (category, jwt) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/competences?category.name=${category}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return await handleBasicReponse(response);
};

const getPropertyContains = (property, keywords) => {
  return {
    _or: [
      ...keywords.map((keyword) => ({ [`${property}_contains`]: keyword })),
    ],
  };
};

export const search = async (keywords, jwt) => {
  if (keywords && keywords.length) {
    const qr = qs.stringify({
      _where: {
        _or: [
          getPropertyContains('competences.name', keywords),
          getPropertyContains('title', keywords),
          getPropertyContains('first_name', keywords),
          getPropertyContains('last_name', keywords),
          // getPropertyContains("bio", keywords),
          // getPropertyContains("skills", keywords),
        ],
      },
    });

    const url = `${process.env.REACT_APP_BACKEND_HOST}/user-profiles?${qr}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return await handleBasicReponse(response);
  }
};

/**
 * Get the allowed email domain
 * @param {string} jwt authoriazation token
 */
export const getEmailDomains = async (jwt) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/email-domains`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return await handleBasicReponse(response);
};

/**
 * Add an allowed email domain
 * @param {string} jwt authoriazation token
 * @param {{domain: string; type: "internal" | "external"}} data email domain name
 */
export const addEmailDomain = async (jwt, data) => { 
  const url = `${process.env.REACT_APP_BACKEND_HOST}/email-domains`;
  const response = await fetchPost(url, data, jwt, 'POST');
  return await handleBasicReponse(response);
};

/**
 * Remove an allowed email domain
 * @param {string} jwt authoriazation token
 * @param {number} id id of the email domain to be removed
 */
export const removeEmailDomain = async (jwt, id) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/email-domains/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return await handleBasicReponse(response);
};

export const sendConfirmationEmail = async (email) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/auth/send-email-confirmation`;
  const body = {
    email: email,
  };

  const response = await fetchPost(url, body);
  return await handleBasicReponse(response);
};

export const sendPasswordReset = async (email) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/auth/forgot-password`;
  const body = {
    email: email,
  };

  const response = await fetchPost(url, body);
  return await handleBasicReponse(response);
};

export const resetPassword = async (code, password, reEnterPassword) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/auth/reset-password`;
  const body = {
    code: code,
    password: password,
    passwordConfirmation: reEnterPassword,
  };

  const response = await fetchPost(url, body);
  return await handleBasicReponse(response);
};

export class EmailOrPasswordInvalidError extends Error {}
export class EmailWrongDomainError extends Error {}
export class EmailTakenError extends Error {}
export class UnauthorizedError extends Error {}
export class NotFoundError extends Error {}

const handleBasicReponse = (response) => {
  switch (response.status) {
    case 200:
      return response.json();
    case 401:
      throw new UnauthorizedError();
    case 404:
      throw new NotFoundError();
    default:
      throw new Error(response.status);
  }
};
