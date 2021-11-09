import { cleanup } from "@testing-library/react";
import Title from "../Title.js";
import { renderWithTheme } from "../../../utils";

const testData = {
    first_name: "Doe",
    last_name: "John",
    title: "Developer",
    image: "https://images.pexels.com/photos/6386956/pexels-photo-6386956.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
};

describe("Title component", () => {
    afterEach(cleanup);
    it("should render correct title", () => {
        const { getByTestId } = renderWithTheme(
            <Title
                title={testData.title}
            />
        );
        const TitleEl = getByTestId("user_title");
        expect(TitleEl).toBeTruthy();
        expect(getByTestId("user_title")).toHaveTextContent(testData.title);
    });
    it("should render correct name", () => {
        const { getByTestId } = renderWithTheme(
            <Title
                first_name={testData.first_name}
                last_name={testData.last_name}
            />
        );
        const NameEl = getByTestId("user_name");
        expect(NameEl).toBeTruthy();
        expect(getByTestId("user_name")).toHaveTextContent(testData.first_name);
        expect(getByTestId("user_name")).toHaveTextContent(testData.last_name);
    });
    it("should render image", () => {
        const { getByTestId } = renderWithTheme(
            <Title
                image={testData.image}
            />
        );
        const ImageEl = getByTestId("avatar");
        expect(ImageEl).toBeTruthy();
        expect(getByTestId("avatar")).toBeInTheDocument();
    });
});

