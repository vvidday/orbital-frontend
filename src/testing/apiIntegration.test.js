import {
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { ApiTest } from "../components/apitesting";
import userEvent from "@testing-library/user-event";

test("Renders without crashing", () => {
    const div = document.createElement("div");
    render(<ApiTest />);
});

test("Request to userByUsername endpoint on API server", async () => {
    // Set up user
    const user = userEvent.setup();
    // Render Component
    render(<ApiTest />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(2);
    const userinput = inputs[0];
    // Focus on input
    userinput.focus();
    // Use keyboard to type
    await user.keyboard("barackobama");
    const title = screen.getByTestId("x");
    // Click on button
    await user.click(screen.getByTestId("user-api-btn"));
    // Wait for call to resolve
    await waitFor(() => screen.findByTestId("cond"));
    // Focus on result element
    const x = screen.getByTestId("user-api-result");
    // Assertion - should correctly pull data.
    expect(x.textContent).toBe(
        '{"id":"813286","name":"Barack Obama","username":"BarackObama"}'
    );
});

test("Request to userTimeline endpoint on API server", async () => {
    // Set up user
    const user = userEvent.setup();
    // Render Component
    render(<ApiTest />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(2);
    const userinput = inputs[1];
    // Focus on input
    userinput.focus();
    // Use keyboard to type
    await user.keyboard("813286");
    const title = screen.getByTestId("x");
    // Click on button
    await user.click(screen.getByTestId("timeline-api-btn"));
    // Wait for call to resolve
    await waitFor(() => screen.findByTestId("cond2"));
    // Focus on result element
    const x = screen.getByTestId("timeline-api-result");
    // Assertion - should correctly pull data.
    expect(JSON.parse(x.textContent).data.length).toBe(10);
});
