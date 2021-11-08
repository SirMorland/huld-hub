import Cookies from "js-cookie";

const { fetchPost } = require("./utils");

export const login = async (email, password) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/auth/local`;
  const body = { identifier: email, password };

  const response = await fetchPost(url, body);
  switch(response.status) {
    case 200:
      return await response.json();
    case 400:
      throw new EmailOrPasswordInvalidError();
    default:
      throw new Error(response.status);
  }
}

export const logout = () => {
  Cookies.remove("hub-jwt");
}

export const register = async(email, password) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/auth/local/register`;
  const body =  {
    email, password, username:email
  };

  const response = await fetchPost(url, body);
  switch(response.status) {
    case 200:
      return await response.json();
    case 400:
      const json = await response.json();
      const message = json.data[0].messages[0];
      switch(message.id) {
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

export const getProfile = async (id, jwt) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/user-profiles/${id}`;
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });

  switch(response.status) {
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

export const getCompetenceCategories = async (jwt) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/competence-categories`;
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });

  switch(response.status) {
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

export class EmailOrPasswordInvalidError extends Error {};
export class EmailWrongDomainError extends Error {};
export class EmailTakenError extends Error {};
export class UnauthorizedError extends Error {};
export class NotFoundError extends Error {};