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
    role: DEFAULT_ROLES.ADMIN,
  },
  {
    username: "huld-employee",
    email: "huld-employee@huld.io",
    password: "huld-employee",
    role: DEFAULT_ROLES.EMPLOYEE,
  },
];

const DEFAULT_COMPETENCES = [
  {
    category: "coding languages",
    items: ["Javascript", "Swift", "Lua", "Kotlin", "CSS"],
  },
  {
    category: "keywords",
    items: ["iOS", "Android", "macOS", "Linux", "REST"],
  },
  {
    category: "skills",
    items: ["Mobile development", "Team leading", "UI/UX", "Embedded systems"],
  },
  {
    category: "positions",
    items: [
      "Consulting",
      "Tech lead Mobile Applications",
      "Mobile Development",
    ],
  },
];

// See https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#database
const DEFAULT_SETTINGS = [
  {
    environment: "",
    type: "plugin",
    name: "users-permissions",
    key: "advanced",
    value: {
      unique_email: true,
      allow_register: true,
      email_confirmation: true,
      email_reset_password: `http://${process.env.WEB_DOMAIN ?? "localhost:3000"}/reset-password`,
      email_confirmation_redirection: `http://${process.env.WEB_DOMAIN ?? "localhost:3000"}/confirm-email`,
      default_role: DEFAULT_ROLES.EMPLOYEE.type,
    },
  },
];

module.exports = {
  DEFAULT_ROLES,
  DEFAULT_USERS,
  DEFAULT_COMPETENCES,
  DEFAULT_SETTINGS,
};
