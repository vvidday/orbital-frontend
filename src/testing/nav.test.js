import { render, screen } from "@testing-library/react";
import "../mocks/matchMedia";
import "@testing-library/jest-dom";
import { Nav } from "../components/nav";
import mockSession from "../data/mockSession";

test("renders without crashing", () => {
    const div = document.createElement("div");
    render(
        <Nav setToggle={(e) => {}} session={null} setGameState={null} />,
        div
    );
});

test("Correct elements are rendered when user is not logged in", () => {
    render(<Nav setToggle={(e) => {}} session={null} setGameState={null} />);
    expect(screen.getByText("Who That?")).toBeInTheDocument();
    expect(screen.getByText("Tweeted")).toBeInTheDocument();
    expect(
        screen.getByLabelText("ToggleMode", { selector: "button" })
    ).toBeInTheDocument();
    expect(screen.getByText("Sign In", { selector: "button" }));
});

test("Correct elements are rendered when user is logged in", () => {
    render(
        <Nav setToggle={(e) => {}} session={mockSession} setGameState={null} />
    );
    expect(screen.getByText("Who That?")).toBeInTheDocument();
    expect(screen.getByText("Tweeted")).toBeInTheDocument();
    expect(
        screen.getByLabelText("ToggleMode", { selector: "button" })
    ).toBeInTheDocument();
    expect(
        screen.getByLabelText("Sign Out", { selector: "button" })
    ).toBeInTheDocument();
});
