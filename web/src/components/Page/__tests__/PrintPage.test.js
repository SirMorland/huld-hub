import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../../utils";
import PrintPage from "../PrintPage";

const profile = {
    id: 1,
    first_name: "firstname",
    last_name: "lastname",
    title: "Administrator",
    email: "test@huld.io",
    phone: "+23456789",
    address: "address",
    github: "@github",
    slack: "@slack",
    bio: "something about myself",
    workHistory: {
        title: "Work History",
        noItemDescription: "Empty work History",
        historyItems: [
            {
                id: 1,
                organisation: "Air Force",
                title: "Bachelor's title",
                start_date: "2021-10-29T11:35:16.000Z",
                end_date: "2021-10-29T11:35:16.000Z",
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
            }
        ]
    },
    educationHistory: {
        title: "education History",
        noItemDescription: "Empty Education History",
        historyItems: [
            {
                id: 1,
                organisation: "High school",
                title: "Bachelor's title",
                start_date: "2021-10-29T11:35:16.000Z",
                end_date: "2021-10-29T11:35:16.000Z",
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere atque quos error voluptatibus illum? Minima delectus a porro animi rerum corrupti voluptas sit dolorem ad accusamus? Quidem, a alias.",
            }
        ]
    },
    image: {
        first_name: "Doe",
        last_name: "John",
        title: "Developer",
        image: "https://images.pexels.com/photos/6386956/pexels-photo-6386956.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    }
}

describe("UserContactinfo component", () => {
    afterEach(cleanup);
    it("should render page without crashing", () => {
        const { container } = renderWithTheme(<PrintPage {...profile} />);
        expect(container).toBeTruthy();
    });
    it("should render all items", () => {
        const { getByText, getByTestId } = renderWithTheme(<PrintPage {...profile} />);
        expect(getByText(profile.email)).toBeInTheDocument();
        expect(getByText(profile.slack)).toBeInTheDocument();
        expect(getByText(profile.github)).toBeInTheDocument();
        expect(getByText(profile.phone)).toBeInTheDocument();
        expect(getByText(profile.first_name + " " + profile.last_name)).toBeInTheDocument();
        expect(getByText(profile.workHistory.historyItems[0].organisation)).toBeInTheDocument();
        expect(getByText(profile.educationHistory.historyItems[0].organisation)).toBeInTheDocument();
        expect(getByText(profile.bio)).toBeInTheDocument();
        expect(getByTestId("avatar")).toBeInTheDocument();
    })
});