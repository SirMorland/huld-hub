import { cleanup } from "@testing-library/react";
import { renderHelper } from "../../../utils";
import SearchItems from "../SearchItems";

const testData = {
  keywords: ["javascript", "css"],
  results: [
    {
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
    },
    {
      id: 7,
      first_name: "Prosper",
      last_name: "Evergreen",
      title: "Full stack developer",
      email: "prosperevergreen@gmail.com",
      phone: "+358453264499",
      address: "Espoo",
      linkedin: "https://www.linkedin.com/in/prosperevergreen/",
      github: "https://github.com/prosperevergreen",
      slack: "",
      skills: "Programmer",
      bio: "I am enthusiastic about tech.",
      user: {
        id: 26,
        username: "prosperevergreen@gmail.com",
        email: "prosperevergreen@gmail.com",
        provider: "local",
        confirmed: true,
        blocked: null,
        role: 13,
        created_at: "2021-11-18T14:17:01.000Z",
        updated_at: "2021-11-18T14:17:24.000Z",
        profile: 7,
      },
      created_at: "2021-11-18T14:17:01.000Z",
      updated_at: "2021-11-19T20:56:33.000Z",
      work_experiences: [
        {
          id: 29,
          company: "Nokia",
          position: "Full Stack Software Developer",
          start_date: "2021-11-01T20:55:45.000Z",
          end_date: null,
          description:
            "- Developing test tools\n- Developing automated systems\n- Creating new solutions",
        },
      ],
      education_histories: [
        {
          id: 32,
          school: "Tampere University",
          degree: "MSc Software, Web and Cloud",
          start_date: "2020-08-01T19:52:27.000Z",
          end_date: null,
          description:
            "- Major in Web development\n- Minor in devOps and Cloud technologies\n- Working with various management tools like git, docker etc",
        },
      ],
      image: {
        id: 1,
        name: "profile-pics.jpeg",
        alternativeText: null,
        caption: null,
        width: 460,
        height: 460,
        formats: {
          thumbnail: {
            name: "thumbnail_profile-pics.jpeg",
            hash: "thumbnail_profile_pics_b3bada8c65",
            ext: ".jpeg",
            mime: "image/jpeg",
            width: 156,
            height: 156,
            size: 6.53,
            path: null,
            url: "/uploads/thumbnail_profile_pics_b3bada8c65.jpeg",
          },
        },
        hash: "profile_pics_b3bada8c65",
        ext: ".jpeg",
        mime: "image/jpeg",
        size: 29.05,
        url: "/uploads/profile_pics_b3bada8c65.jpeg",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        created_at: "2021-11-19T20:57:36.000Z",
        updated_at: "2021-11-19T20:57:36.000Z",
      },
      competences: [
        {
          id: 5,
          name: "REST",
          description: null,
          category: 3,
          created_at: "2021-10-22T12:23:05.000Z",
          updated_at: "2021-10-22T12:23:05.000Z",
        },
        {
          id: 4,
          name: "iOS",
          description: null,
          category: 3,
          created_at: "2021-10-22T12:23:05.000Z",
          updated_at: "2021-10-22T12:23:05.000Z",
        },
        {
          id: 11,
          name: "Javascript",
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
        {
          id: 12,
          name: "Swift",
          description: null,
          category: 5,
          created_at: "2021-10-22T12:23:05.000Z",
          updated_at: "2021-10-22T12:23:05.000Z",
        },
      ],
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

describe("SearchItems component", () => {
  afterEach(cleanup);
  it("should render correct when nothing is searched", () => {
    const { getByText } = renderHelper(<SearchItems />);
    expect(getByText("Search employee database...")).toBeTruthy();
  });

  it("should render correct when no search result is found", () => {
    const { getByText } = renderHelper(
      <SearchItems searchTerms={testData.keywords} />
    );
    expect(getByText("No Match Found")).toBeTruthy();
  });

  it("should render correct number search results", () => {
    const { getByTestId } = renderHelper(
      <SearchItems searchTerms={testData.keywords} results={testData.results} />
    );
    const itemsEl = getByTestId("search-results");
    expect(itemsEl.children).toHaveLength(testData.results.length);
  });
});
