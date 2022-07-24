import { render, screen, waitFor } from "@testing-library/react";
import "../mocks/matchMedia";
import "@testing-library/jest-dom";
import { GameCodeGenerate } from "../components/gameCodeGenerate";
import userEvent from "@testing-library/user-event";

test("renders without crashing", () => {
    const div = document.createElement("div");
    render(<GameCodeGenerate setGameState={null} />, div);
});

test("renders correct elements", () => {
    render(<GameCodeGenerate setGameState={null} />);
    expect(screen.getByText("Generate Link")).toBeInTheDocument();
    expect(
        screen.getByText("Input Twitter Handle/Username (Limited to 8):")
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
});

test("renders correct elements", () => {
    render(<GameCodeGenerate setGameState={null} />);
    expect(screen.getByText("Generate Link")).toBeInTheDocument();
    expect(
        screen.getByText("Input Twitter Handle/Username (Limited to 8):")
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
});

test("correctly accepts valid twitter username and with wrong capitalization", async () => {
    const user = userEvent.setup();
    render(<GameCodeGenerate setGameState={null} />);
    await user.click(screen.getByRole("textbox"));
    await user.keyboard("BarackObama");
    await user.keyboard("{Enter}");
    await waitFor(() => screen.getByText("BarackObama"), { timeout: 5000 });
    // Incorrect capitalization test
    await user.click(screen.getByRole("textbox"));
    await user.keyboard("cristiano");
    await user.keyboard("{Enter}");
    await waitFor(() => screen.getByText("cristiano"), { timeout: 5000 });
});

test("correctly rejects invalid username and shows error message", async () => {
    const user = userEvent.setup();
    render(<GameCodeGenerate setGameState={null} />);
    await user.click(screen.getByRole("textbox"));
    await user.keyboard("invaliduser9134342");
    await user.keyboard("{Enter}");
    await waitFor(
        () =>
            screen.getByText(
                "invaliduser9134342 is not a valid twitter username."
            ),
        { timeout: 5000 }
    );
});
