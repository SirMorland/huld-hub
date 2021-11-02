const { fetchPost } = require("./utils");

const login = async (email, password) => {
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

const register = async(email, password) => {
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

class EmailOrPasswordInvalidError extends Error {};
class EmailWrongDomainError extends Error {};
class EmailTakenError extends Error {};

module.exports = {
  login, register,
  EmailOrPasswordInvalidError, EmailWrongDomainError, EmailTakenError
};