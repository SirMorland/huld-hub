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
}

export const register = async (email, password) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/auth/local/register`;
  const body = {
    email, password, username: email
  };

  const response = await fetchPost(url, body);
  switch (response.status) {
    case 200:
      return await response.json();
    case 400:
      const json = await response.json();
      const message = json.data[0].messages[0];
      switch (message.id) {
        case "Auth.form.error.email.format":
          throw new EmailWrongDomainError(message.message);
        case "Auth.form.error.email.taken":
          throw new EmailTakenError();
        default:
          throw new Error(json.data[0].message[0].message);
      }
    default:
      throw new Error(response.status);
  }
}

export const getProfileById = async (id, jwt) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/user-profiles/${id}`;
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
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
}

export const postProfile = async (profile, jwt) => {
  // TODO: implement this
  const url = `${process.env.REACT_APP_BACKEND_HOST}/user-profiles/${profile.id}`;
  const response = await fetchPost(url, profile, jwt, "PUT");
  return await handleBasicReponse(response);
}

export const uploadPicture = async (file, jwt) => {
    const body = new FormData();
    body.append("files", file);
    const url = `${process.env.REACT_APP_BACKEND_HOST}/upload`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${jwt}`
      },
      body,
    });
    return await handleBasicReponse(response);
};

export const getCompetenceCategories = async (jwt) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/competence-categories?name=keywords&name=coding%20languages`;
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
  return await handleBasicReponse(response);
}

export const getCategoryCompetences = async (category, jwt) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/competences?category.name=${category}`;
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
  return await handleBasicReponse(response);
}

const getPropertyContains = (property, keywords) => {
  return { _or: [...keywords.map(keyword => ({ [`${property}_contains`]: keyword })) ]}
}

export const search = async (keywords, jwt) => {
  if (keywords && keywords.length) {
  
    const qr = qs.stringify({
      _where: {
        _or: [
          getPropertyContains("competences.name", keywords),
          getPropertyContains("bio", keywords),
          getPropertyContains("title", keywords),
          getPropertyContains("skills", keywords),
        ],
      },
    });
  
    const url = `${process.env.REACT_APP_BACKEND_HOST}/user-profiles?${qr}`;
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    });
  
    return await handleBasicReponse(response);
  }
}


export class EmailOrPasswordInvalidError extends Error { };
export class EmailWrongDomainError extends Error { };
export class EmailTakenError extends Error { };
export class UnauthorizedError extends Error { };
export class NotFoundError extends Error { };

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
}