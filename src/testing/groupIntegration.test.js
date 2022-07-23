import {
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import userEvent from "@testing-library/user-event";
import "../mocks/matchMedia";

test("renders without crashing", () => {
    const div = document.createElement("div");
    render(<App />, div);
});

test("Group selection component correctly renders default groups", () => {
    render(<App />);
    expect(screen.getByText("Default")).toBeInTheDocument();
    expect(screen.getByText("MMA")).toBeInTheDocument();
    expect(screen.getByText("US Politics")).toBeInTheDocument();
    expect(screen.getByText("Twitch")).toBeInTheDocument();
});

test("App, group selection and custom group components correctly work together", async () => {
    render(<App />);
    const user = userEvent.setup();
    // Checking for custom group component to be rendered with App
    const customGroupButton = screen.getByText("Build Custom Group");
    expect(customGroupButton).toBeInTheDocument();
    // Click on build custom group button
    await user.click(customGroupButton);
    // Display should change to show custom group component
    await waitFor(() => screen.findByText("Play"));
    const playButton = screen.getByText("Play");
    expect(playButton).toBeInTheDocument();
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(1);
});

// test("Custom group component correctly integrates with API", async () => {
//     render(<App />);
//     const user = userEvent.setup();
//     const customGroupButton = screen.getByText("Build Custom Group");
//     await user.click(customGroupButton);
//     await waitFor(() => screen.findByText("Play"));
//     const inputs = screen.getAllByRole("textbox");
//     const userinput = inputs[0];
//     // Focus on input
//     userinput.focus();
//     // Use keyboard to type
//     await user.keyboard("barackobama");
// });
