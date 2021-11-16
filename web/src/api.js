const { fetchPost } = require("./utils");

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

export const getProfile = async (id, jwt) => {
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

export const uploadPicture = (file, jwt) => new Promise((resolve,reject) => {
  const formData = new FormData();
  formData.append("files", file);
  const url = `${process.env.REACT_APP_BACKEND_HOST}/upload`;
  const request = new XMLHttpRequest();
  request.open("POST", url);
  request.setRequestHeader("Authorization", `Bearer ${jwt}`);
  request.send(formData);
  request.addEventListener("load", () => {
    if (request.status === 200) {
      resolve(request.response);
    } else {
      reject(request.status);
    }
  });
})

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

export const uploadImage = async (profile, file, event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('file', file[0]);

  const url = `${process.env.REACT_APP_BACKEND_HOST}/user-profiles/${profile.image.formats.small.url}`;
  const response = await fetchPost(url, formData);
  return await handleBasicReponse(response);
}