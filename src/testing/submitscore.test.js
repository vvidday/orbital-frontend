import { render, screen } from "@testing-library/react";
import "../mocks/matchMedia";
import "@testing-library/jest-dom";
import { SubmitScore } from "../components/submitscore";

test("renders without crashing", () => {
    const div = document.createElement("div");
    render(<SubmitScore setGameState={null} accs={null} session={null} />, div);
});

test("renders correct elements when user is not logged in", () => {
    render(<SubmitScore setGameState={null} accs={null} session={null} />);
    expect(screen.getByText("Submit Score")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
});
