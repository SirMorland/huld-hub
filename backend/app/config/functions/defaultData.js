const DEFAULT_ROLES = {
  ADMIN: {
    name: "Admin",
    descripton: "Admin user",
    type: "admin",
    canUpload: true,
    applicationPermissions: [
      {
        controller: 'competences',
        actions: ['find', 'create', 'delete'],
      },
      {
        controller: 'comptence-categories',
        actions: ['find'],
      },
      {
        controller: 'user-profiles',
        actions: ['find', 'update', 'delete', 'findone'],
      },
      {
        controller: 'user-role',
        actions: ['update'],
      },
      {
        controller: 'user-password',
        actions: ['update'],
      }
    ],
    usersPermissions: [
      {
        controller: 'user',
        action: 'find',
      },
      {
        controller: 'userspermissions',
        action: 'getroles',
      }
    ]
  },

  EMPLOYEE: {
    name: "Employee",
    descripton: "Employee user",
    type: "employee",
    canUpload: true,
    applicationPermissions: [
      {
        controller: 'competences',
        actions: ['find'],
      },
      {
        controller: 'comptence-categories',
        actions: ['find'],
      },
      {
        controller: 'user-profiles',
        actions: ['find', 'update', 'findone'],
      },
      {
        controller: 'user-password',
        actions: ['update'],
      }
    ],
  },
  
  PUBLIC: {
    name: "Public",
    usersPermissions: [
      {
        controller: 'auth',
        action: 'sendemailconfirmation',
      },
    ]
  }
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
      email_reset_password: `http://${process.env.WEB_DOMAIN || "localhost:3000"}/reset-password`,
      email_confirmation_redirection: `http://${process.env.WEB_DOMAIN || "localhost:3000"}/email-confirmed`,
      default_role: DEFAULT_ROLES.EMPLOYEE.type,
    },
  },
  {
    environment: "",
    type: "plugin",
    name: "users-permissions",
    key: "email",
    value: {
      "reset_password": {
        "display": "Email.template.reset_password",
        "icon": "sync",
        "options": {
          "from": {
            "name": "Administration Panel",
            "email": process.env.SMTP_USERNAME,
          },
          "response_email": "",
          "object": "Reset password",
          "message": "<p>We heard that you lost your password. Sorry about that!</p>\n\n<p>But don’t worry! You can use the following link to reset your password:</p>\n<p><%= URL %>?code=<%= TOKEN %></p>\n\n<p>Thanks.</p>"
        }
      },
      "email_confirmation": {
        "display": "Email.template.email_confirmation",
        "icon": "check-square",
        "options": {
          "from": {
            "name": "Administration Panel",
            "email": process.env.SMTP_USERNAME,
          },
          "response_email": "",
          "object": "Account confirmation",
          "message": "<p>Thank you for registering!</p>\n\n<p>You have to confirm your email address. Please click on the link below.</p>\n\n<p><%= URL %>?confirmation=<%= CODE %></p>\n\n<p>Thanks.</p>"
        }
      }
    },
  },
];


const DEFAULT_PROFILES = [
  {
    username: 'huld-admin',
    last_name: "Meikäläinen",
    first_name: "Matti",
    title: "Administrator",
    email: "huld-admin@huld.io",
    phone: "+358 353 588 888",
    address: "Tampere",
    linkedin: "https://linkedin.com/huld-admin",
    github: "https://github.com/huld-admin",
    slack: "@huld-admin",
    work_experiences: [
      {
        start_date: "2021-10-20T12:36:26.000Z",
        position: "Admin",
        description: "I have been doing admin at admin for few years. It's a nice job with interesting tasks. I love the work that I am doing here.",
        company: "Mix n go Oy",
      },
      {
        start_date: "2020-10-20T12:36:26.000Z",
        end_date: "2021-10-20T12:36:26.000Z",
        title: "Cleaner at Admin",
        position: "cleaner",
        company: "Jaffe and Hilbert",
        description: "Cleaning up admin desks, tables. Making coffee every morning"
      }
    ],
    education_histories: [
      {
        school: "Tampere University",
        start_date: "2021-10-20T12:36:26.000Z",
        degree: "Master Degree",
        description: "Doing a master degree focused in administration work"
      },
      {
        start_date: "2011-10-20T12:36:26.000Z",
        end_date: "2015-10-20T12:36:26.000Z",
        degree: "Bachelor Degree",
        school: "Tampere University",
        description: "Did a bachelor degree focused in cleaning up and making coffee"
      }
    ],
    competences: ['Javascript', 'Swift', 'Lua', 'Kotlin', 'CSS'],
    skills: "Technology\nInternet\nNetflix\nTesting",
    bio: "I am an admin. I like to administrate.",
  },
  {
    username: "huld-employee",
    last_name: "John",
    first_name: "Doe",
    title: "Employee",
    email: "huld-employee@huld.io",
    phone: "+358 853 333 333",
    address: "Helsinki",
    linkedin: "https://linkedin.com/huld-employee",
    github: "https://github.com/huld-employee",
    slack: "@huld-employee",
    skills: "Technology\nInternet\nNetflix",
    bio: "I am an employee. I like to work.",
    work_experiences: [
      {
        start_date: "2021-10-20T12:36:26.000Z",
        title: "Employee at Admin",
        description: "I have been doing employee work at admin for few years. It's a nice job with interesting tasks. I love the work that I am doing here.",
        position: "Employee",
        company: "Admin Oy",
      },
      {
        start_date: "2020-10-20T12:36:26.000Z",
        end_date: "2021-10-20T12:36:26.000Z",
        title: "Cleaner at Admin",
        position: "Cleaner",
        description: "Cleaning up admin desks, tables. Making coffee every morning",
        company: "Mix n Go Oy",
      }
    ],
    education_histories: [
      {
        start_date: "2021-10-20T12:36:26.000Z",
        school: "Tampere University",
        degree: "Master degree",
        description: "Doing a master degree focused in employee work"
      },
      {
        start_date: "2011-10-20T12:36:26.000Z",
        end_date: "2015-10-20T12:36:26.000Z",
        degree: "Bachelor Degree",
        school: "Tampere University",
        description: "Did a bachelor degree focused in cleaning up and making coffee"
      }
    ],
    competences: ['Mobile development', 'Team leading', 'UI/UX', 'Embedded systems']
  }
];

module.exports = {
  DEFAULT_ROLES,
  DEFAULT_USERS,
  DEFAULT_COMPETENCES,
  DEFAULT_SETTINGS,
  DEFAULT_PROFILES,
};
