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


const DEFAULT_COMPETENCES = [
  {
    category: 'coding languages',
    items: ['Javascript', 'Swift', 'Lua', 'Kotlin', 'CSS'],
  },
  {
    category: 'keywords',
    items: ['iOS', 'Android', 'macOS', 'Linux', 'REST'],
  },
  {
    category: 'skills',
    items: ['Mobile development', 'Team leading', 'UI/UX', 'Embedded systems']
  },
  {
    category: 'positions',
    items: ['Consulting', 'Tech lead Mobile Applications', 'Mobile Development']
  }
];

const DEFAULT_PROFILES = [
  {
    username: 'huld-admin',
    name: "Admin Admin",
    title: "Administrator",
    email: "huld-admin@huld.io",
    phone: "+358 353 588 888",
    address: "Admininkatu 503, 00503, Helsinki",
    linkedin: "https://linkedin.com/huld-admin",
    github: "https://github.com/huld-admin",
    slack: "@huld-admin",
    work_experiences: [
      {
        id: 1,
        from_date: "2021-10-20T12:36:26.000Z",
        title: "Admin at Admin",
        sub_title: "Administrator",
        description: "I have been doing admin at admin for few years. It's a nice job with interesting tasks. I love the work that I am doing here."
      },
      {
        id: 2,
        from_date: "2020-10-20T12:36:26.000Z",
        to_date: "2021-10-20T12:36:26.000Z",
        title: "Cleaner at Admin",
        sub_title: "Cleaner",
        description: "Cleaning up admin desks, tables. Making coffee every morning"
      }
    ],
    education_histories: [
      {
        id: 1,
        from_date: "2021-10-20T12:36:26.000Z",
        title: "Master Degree at Tampere University",
        description: "Doing a master degree focused in administration work"
      },
      {
        id: 2,
        from_date: "2011-10-20T12:36:26.000Z",
        to_date: "2015-10-20T12:36:26.000Z",
        title: "Bachelor Degree at Tampere University",
        description: "Did a bachelor degree focused in cleaning up and making coffee"
      }
    ],
    competences: ['Javascript', 'Swift', 'Lua', 'Kotlin', 'CSS'],
  },
  {
    username: "huld-employee",
    name: "Employee Employee",
    title: "Employee",
    email: "huld-employee@huld.io",
    phone: "+358 853 333 333",
    address: "Työntekijänkatu 404, 00404, Helsinki",
    linkedin: "https://linkedin.com/huld-employee",
    github: "https://github.com/huld-employee",
    slack: "@huld-employee",
    work_experiences: [
      {
        id: 3,
        from_date: "2021-10-20T12:36:26.000Z",
        title: "Employee at Admin",
        sub_title: "Employee",
        description: "I have been doing employee work at admin for few years. It's a nice job with interesting tasks. I love the work that I am doing here."
      },
      {
        id: 4,
        from_date: "2020-10-20T12:36:26.000Z",
        to_date: "2021-10-20T12:36:26.000Z",
        title: "Cleaner at Admin",
        sub_title: "Cleaner",
        description: "Cleaning up admin desks, tables. Making coffee every morning"
      }
    ],
    education_histories: [
      {
        id: 3,
        from_date: "2021-10-20T12:36:26.000Z",
        title: "Master Degree at Tampere University",
        description: "Doing a master degree focused in employee work"
      },
      {
        id: 4,
        from_date: "2011-10-20T12:36:26.000Z",
        to_date: "2015-10-20T12:36:26.000Z",
        title: "Bachelor Degree at Tampere University",
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
  DEFAULT_PROFILES,
};
