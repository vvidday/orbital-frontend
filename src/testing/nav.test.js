import { render, screen } from "@testing-library/react";
import "../mocks/matchMedia";
import "@testing-library/jest-dom";
import { Nav } from "../components/nav";

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
    //expect(screen.getByText("Sign In", { selector: "button" }));
});

// Update for changes.
// test("Correct elements are rendered when user is logged in", () => {
//     render(
//         <Nav setToggle={(e) => {}} session={{ e: 0 }} setGameState={null} />
//     );
//     expect(screen.getByText("Who That?")).toBeInTheDocument();
//     expect(screen.getByText("Tweeted")).toBeInTheDocument();
//     expect(
//         screen.getByLabelText("ToggleMode", { selector: "button" })
//     ).toBeInTheDocument();
//     expect(screen.getByText("Sign Out", { selector: "button" }));
//     expect(screen.getByText("Profile", { selector: "button" }));
// });
