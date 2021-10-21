const DEFAULT_ROLES = {
  ADMIN: {
    name: "Admin",
    descripton: "Admin user",
    type: "admin",
  },

  EMPLOYEE: {
    name: "Employee",
    descripton: "Employee user",
    type: "employee",
  },
};

const DEFAULT_USERS = [
  {
    username: "huld-admin",
    email: "huld-admin@huld.io",
    password: "huld-admin",
    role: DEFAULT_ROLES.ADMIN
  },
  {
    username: "huld-employee",
    email: "huld-employee@huld.io",
    password: "huld-employee",
    role: DEFAULT_ROLES.EMPLOYEE
  },
];

module.exports = {
  DEFAULT_ROLES,
  DEFAULT_USERS,
};
