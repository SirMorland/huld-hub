import { cleanup } from "@testing-library/react";
import { renderWithTheme } from "../../utils";
import ProfilePicEdit from "../ProfilePicEdit";
import user from "@testing-library/user-event";

describe("ProfilePicEdit component", () => {
    afterEach(cleanup);

    it("should render without crashing", () => {
        const { container } = renderWithTheme(<ProfilePicEdit />);
        expect(container).toBeTruthy();
    });

    it("should render input and label", () => {
        const { getByTestId } = renderWithTheme(<ProfilePicEdit />);
        const fileInputEl = getByTestId("file-input");
        const fileLabelEl = getByTestId("file-label");
        expect(fileInputEl).toBeTruthy();
        expect(fileLabelEl).toBeTruthy();
    });
    it("file upload", async () => {

        const file = new File(["hello"], "hello.png", { type: "image/png" });
        const { getByTestId } = renderWithTheme(<ProfilePicEdit />);
        let uploader = getByTestId("file-input");

        // setting up URL on the Global in Jest
        global.URL.createObjectURL = jest.fn();

        user.upload(uploader, file);
        expect(uploader.files[0]).toEqual(file);
        expect(uploader.files).toHaveLength(1);
    });
});