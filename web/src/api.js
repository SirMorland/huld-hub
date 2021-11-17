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

export const postProfile = async (profile, jwt) => {
  // TODO: implement this
  const url = `${process.env.REACT_APP_BACKEND_HOST}/user-profiles/${profile.id}`;
  const response = await fetchPost(url, profile, jwt, "PUT");
  return await handleBasicReponse(response);
}

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

export const search = async (query, jwt) => {
  // TO:DO replace with actual search API
  if(query === "") {
    return [];
  }

  return [
    {"id":19,"first_name":"Matti","last_name":"Meikäläinen","title":"Administrator","email":"huld-admin@huld.io","phone":"+358 353 588 888","address":"Tampere","linkedin":"https://linkedin.com/huld-admin","github":"https://github.com/huld-admin","slack":"@huld-admin","skills":"Technology\nInternet\nNetflix\nTesting","bio":"I am an admin. I like to administrate.","user":{"id":43,"username":"huld-admin","email":"huld-admin@huld.io","provider":"local","confirmed":true,"blocked":null,"role":4,"created_at":"2021-11-05T11:36:50.000Z","updated_at":"2021-11-05T11:36:50.000Z","profile":19},"created_at":"2021-11-05T11:36:50.000Z","updated_at":"2021-11-05T11:36:50.000Z","work_experiences":[{"id":25,"company":"Mix n go Oy","position":"Admin","start_date":"2021-10-20T12:36:26.000Z","end_date":null,"description":"I have been doing admin at admin for few years. It's a nice job with interesting tasks. I love the work that I am doing here."},{"id":26,"company":"Jaffe and Hilbert","position":"cleaner","start_date":"2020-10-20T12:36:26.000Z","end_date":"2021-10-20T12:36:26.000Z","description":"Cleaning up admin desks, tables. Making coffee every morning"}],"education_histories":[{"id":25,"school":"Tampere University","degree":"Master Degree","start_date":"2021-10-20T12:36:26.000Z","end_date":null,"description":"Doing a master degree focused in administration work"},{"id":26,"school":"Tampere University","degree":"Bachelor Degree","start_date":"2011-10-20T12:36:26.000Z","end_date":"2015-10-20T12:36:26.000Z","description":"Did a bachelor degree focused in cleaning up and making coffee"}],"image":null,"competences":[{"id":1,"name":"Swift","description":null,"category":3,"created_at":"2021-10-26T13:24:52.000Z","updated_at":"2021-10-26T13:24:52.000Z"},{"id":2,"name":"Javascript","description":null,"category":3,"created_at":"2021-10-26T13:24:52.000Z","updated_at":"2021-10-26T13:24:52.000Z"},{"id":6,"name":"Kotlin","description":null,"category":3,"created_at":"2021-10-26T13:24:52.000Z","updated_at":"2021-10-26T13:24:52.000Z"},{"id":7,"name":"CSS","description":null,"category":3,"created_at":"2021-10-26T13:24:52.000Z","updated_at":"2021-10-26T13:24:52.000Z"},{"id":9,"name":"Lua","description":null,"category":3,"created_at":"2021-10-26T13:24:52.000Z","updated_at":"2021-10-26T13:24:52.000Z"}]},
    {"id":20,"first_name":"Doe","last_name":"John","title":"Employee","email":"huld-employee@huld.io","phone":"+358 853 333 333","address":"Helsinki","linkedin":"","github":"https://github.com/huld-employee","slack":"@huld-employee","skills":"Technology\nInternet\nNetflix","bio":"I am an employee. I like to work.","user":{"id":44,"username":"huld-employee","email":"huld-employee@huld.io","provider":"local","confirmed":true,"blocked":null,"role":3,"created_at":"2021-11-05T11:36:50.000Z","updated_at":"2021-11-10T09:23:15.000Z","profile":20},"created_at":"2021-11-05T11:36:50.000Z","updated_at":"2021-11-10T09:23:15.000Z","work_experiences":[{"id":27,"company":"Admin Oy","position":"Employee","start_date":"2021-10-20T12:36:26.000Z","end_date":null,"description":"I have been doing employee work at admin for few years. It's a nice job with interesting tasks. I love the work that I am doing here."},{"id":28,"company":"Mix n Go Oy","position":"Cleaner","start_date":"2020-10-20T12:36:26.000Z","end_date":"2021-10-20T12:36:26.000Z","description":"Cleaning up admin desks, tables. Making coffee every morning"}],"education_histories":[{"id":27,"school":"Tampere University","degree":"Master degree","start_date":"2021-10-20T12:36:26.000Z","end_date":null,"description":"Doing a master degree focused in employee work"},{"id":28,"school":"Tampere University","degree":"Bachelor Degree","start_date":"2011-10-20T12:36:26.000Z","end_date":"2015-10-20T12:36:26.000Z","description":"Did a bachelor degree focused in cleaning up and making coffee"}],"image":null,"competences":[{"id":4,"name":"Mobile Development","description":null,"category":1,"created_at":"2021-10-26T13:24:52.000Z","updated_at":"2021-10-26T13:24:52.000Z"},{"id":8,"name":"UI/UX","description":null,"category":4,"created_at":"2021-10-26T13:24:52.000Z","updated_at":"2021-10-26T13:24:52.000Z"},{"id":10,"name":"Embedded systems","description":null,"category":4,"created_at":"2021-10-26T13:24:52.000Z","updated_at":"2021-10-26T13:24:52.000Z"},{"id":16,"name":"Mobile development","description":null,"category":4,"created_at":"2021-10-26T13:24:52.000Z","updated_at":"2021-10-26T13:24:52.000Z"},{"id":17,"name":"Team leading","description":null,"category":4,"created_at":"2021-10-26T13:24:52.000Z","updated_at":"2021-10-26T13:24:52.000Z"}]}
  ];
}


export class EmailOrPasswordInvalidError extends Error {};
export class EmailWrongDomainError extends Error {};
export class EmailTakenError extends Error {};
export class UnauthorizedError extends Error {};
export class NotFoundError extends Error {};

const handleBasicReponse = (response) => {
  switch(response.status) {
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
