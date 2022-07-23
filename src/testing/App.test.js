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

test("navbar is rendered", () => {
    render(<App />);
    expect(screen.getByText("Who That?")).toBeInTheDocument();
    expect(screen.getByText("Tweeted")).toBeInTheDocument();
    expect(
        screen.getByLabelText("ToggleMode", { selector: "button" })
    ).toBeInTheDocument();
    expect(screen.getByText("Sign In", { selector: "button" }));
});

test("default group is rendered", () => {
    render(<App />);
    expect(screen.getByText("Default")).toBeInTheDocument();
    expect(screen.getByText("@BarackObama")).toBeInTheDocument();
    expect(screen.getByText("@Cristiano")).toBeInTheDocument();
    expect(screen.getByText("@justinbieber")).toBeInTheDocument();
    expect(screen.getByText("@katyperry")).toBeInTheDocument();
});
/*
test("input form is rendered", () => {
    render(<App />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
        screen.getByText("Play", { selector: "button" })
    ).toBeInTheDocument();
});
*/
test("custom group is rendered", () => {
    render(<App />);
    expect(
        screen.getByText("Build Custom Group", { selector: "button" })
    ).toBeInTheDocument();
});
/*
test("Your Following helper popover is rendered", () => {
    render(<App />);
    expect(screen.getByLabelText("Your Following Helper")).toBeInTheDocument();
});

test("Your Following is rendered", () => {
    render(<App />);
    expect(
        screen.getByLabelText("Your Following", { selector: "button" })
    ).toBeInTheDocument();
});*/