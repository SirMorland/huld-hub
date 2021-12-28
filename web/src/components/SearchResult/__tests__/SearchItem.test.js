import { cleanup } from "@testing-library/react";
import { renderHelper } from "../../../utils";
import SearchItem from "../SearchItem";

const testData = {
  searchTerms: ["javascript", "css"],
  id: 5,
  first_name: "Matti",
  last_name: "Meikäläinen",
  title: "Administrator",
  email: "huld-admin@huld.io",
  phone: "+358 353 588 888",
  address: "Tampere",
  linkedin: "https://linkedin.com/huld-admin",
  github: "https://github.com/huld-admin",
  slack: "@huld-admin",
  skills: "Technology\nInternet\nNetflix\nTesting",
  bio: "I am an admin. I like to administrate.",
  user: {
    id: 24,
    username: "huld-admin",
    email: "huld-admin@huld.io",
    provider: "local",
    confirmed: true,
    blocked: null,
    role: 12,
    created_at: "2021-11-05T10:12:50.000Z",
    updated_at: "2021-11-05T12:21:20.000Z",
    profile: 5,
  },
  created_at: "2021-11-05T12:21:20.000Z",
  updated_at: "2021-11-05T12:21:20.000Z",
  work_experiences: [
    {
      id: 9,
      company: "Mix n go Oy",
      position: "Admin",
      start_date: "2021-10-20T12:36:26.000Z",
      end_date: null,
      description:
        "I have been doing admin at admin for few years. It's a nice job with interesting tasks. I love the work that I am doing here.",
    },
    {
      id: 10,
      company: "Jaffe and Hilbert",
      position: "cleaner",
      start_date: "2020-10-20T12:36:26.000Z",
      end_date: "2021-10-20T12:36:26.000Z",
      description:
        "Cleaning up admin desks, tables. Making coffee every morning",
    },
  ],
  education_histories: [
    {
      id: 9,
      school: "Tampere University",
      degree: "Master Degree",
      start_date: "2021-10-20T12:36:26.000Z",
      end_date: null,
      description: "Doing a master degree focused in administration work",
    },
    {
      id: 10,
      school: "Tampere University",
      degree: "Bachelor Degree",
      start_date: "2011-10-20T12:36:26.000Z",
      end_date: "2015-10-20T12:36:26.000Z",
      description:
        "Did a bachelor degree focused in cleaning up and making coffee",
    },
  ],
  image: null,
  competences: [
    {
      id: 11,
      name: "Javascript",
      description: null,
      category: 5,
      created_at: "2021-10-22T12:23:05.000Z",
      updated_at: "2021-10-22T12:23:05.000Z",
    },
    {
      id: 12,
      name: "Swift",
      description: null,
      category: 5,
      created_at: "2021-10-22T12:23:05.000Z",
      updated_at: "2021-10-22T12:23:05.000Z",
    },
    {
      id: 13,
      name: "Lua",
      description: null,
      category: 5,
      created_at: "2021-10-22T12:23:05.000Z",
      updated_at: "2021-10-22T12:23:05.000Z",
    },
    {
      id: 14,
      name: "Kotlin",
      description: null,
      category: 5,
      created_at: "2021-10-22T12:23:05.000Z",
      updated_at: "2021-10-22T12:23:05.000Z",
    },
    {
      id: 15,
      name: "CSS",
      description: null,
      category: 5,
      created_at: "2021-10-22T12:23:05.000Z",
      updated_at: "2021-10-22T12:23:05.000Z",
    },
  ],

  competenceCategories: [
    {
      id: 3,
      name: "keywords",
      description: null,
      created_at: "2021-10-22T12:23:05.000Z",
      updated_at: "2021-10-22T12:23:05.000Z",
    },
    {
      id: 5,
      name: "coding languages",
      description: null,
      created_at: "2021-10-22T12:23:05.000Z",
      updated_at: "2021-10-22T12:23:05.000Z",
    },
  ],
};

describe("SearchItem component", () => {
  afterEach(cleanup);
  it("should render correct data", () => {
    const { getByText } = renderHelper(<SearchItem {...testData} />);
    expect(getByText(`${testData.first_name} ${testData.last_name}`)).toBeTruthy();
    expect(getByText(testData.title)).toBeTruthy();
  });

  it("should highlight matched text", () => {
    const { getByText } = renderHelper(<SearchItem {...testData} />);
    testData.searchTerms.forEach((text) => {
      const re = new RegExp(`${text}`, 'i')
      const textMatch = getByText(re);
      expect(textMatch).toBeTruthy();
      expect(window.getComputedStyle(textMatch).color).toBe("blue")
    });
  });

  it("should render correct profile link", () => {
    const { getByText } = renderHelper(<SearchItem {...testData} />);
    const profileLinkEl = getByText("Profile");
    expect(profileLinkEl).toBeTruthy();
    expect(profileLinkEl.tagName.toLowerCase()).toBe("a");
    expect(profileLinkEl.getAttribute("href")).toContain(`/profile/${testData.id}`);
  });

});
