import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import userEvent from "@testing-library/user-event";
import "../mocks/matchMedia";
import { Selection } from "../components/groupSelection";

test("renders without crashing", () => {
    const div = document.createElement("div");
    render(
        <Selection
            setGameState={null}
            accs={null}
            setAccs={null}
            session={null}
        />,
        div
    );
});

test("Group selection component correctly renders default groups", () => {
    render(
        <Selection
            setGameState={null}
            accs={null}
            setAccs={null}
            session={null}
        />
    );
    expect(screen.getByText("Default")).toBeInTheDocument();
    expect(screen.getByText("MMA")).toBeInTheDocument();
    expect(screen.getByText("US Politics")).toBeInTheDocument();
    expect(screen.getByText("Twitch")).toBeInTheDocument();
});

test("App, group selection and custom group components correctly work together", async () => {
    render(
        <Selection
            setGameState={null}
            accs={null}
            setAccs={null}
            session={null}
        />
    );
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
