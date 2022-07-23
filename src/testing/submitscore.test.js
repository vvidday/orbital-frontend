import { render, screen } from "@testing-library/react";
import "../mocks/matchMedia";
import "@testing-library/jest-dom";
import { SubmitScoreImproved } from "../components/submitscoreImproved";

test("renders without crashing", () => {
    const div = document.createElement("div");
    render(
        <SubmitScoreImproved setGameState={null} accs={null} session={null} />,
        div
    );
});

test("renders correct elements when user is not logged in", () => {
    render(
        <SubmitScoreImproved setGameState={null} accs={null} session={null} />
    );
    expect(screen.getByText("Submit Score")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
});
