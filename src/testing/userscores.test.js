import { render, screen, waitFor } from "@testing-library/react";
import "../mocks/matchMedia";
import "@testing-library/jest-dom";
import { UserScoresImproved } from "../components/userScoresImproved";
import mockSession from "../data/mockSession";

const newMockSession = { ...mockSession };
// Test uses fastcat821's id, to check if correct data is displayed.
newMockSession["user"]["id"] = "3d25cd31-de0b-47b2-95c8-88509fa7376b";

test("renders without crashing", () => {
    const div = document.createElement("div");
    render(
        <UserScoresImproved
            session={mockSession}
            setGameState={null}
            setAccs={null}
        />,
        div
    );
});

test("Correctly renders group information based on session", async () => {
    render(
        <UserScoresImproved
            session={newMockSession}
            setGameState={null}
            setAccs={null}
        />
    );
    await waitFor(() => screen.findByText("Group"), { timeout: 10000 });
    expect(screen.getByText("Group")).toBeInTheDocument();
    expect(screen.getByText("@justinbieber")).toBeInTheDocument();
    expect(screen.getAllByText("Play").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Share").length).toBeGreaterThan(0);
});
