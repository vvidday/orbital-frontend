import { render, screen, waitFor } from "@testing-library/react";
import "../mocks/matchMedia";
import "@testing-library/jest-dom";
import { Profile } from "../components/profile";
import mockSession from "../data/mockSession";
import userEvent from "@testing-library/user-event";

/*
Integration test - tests the following components working together:
    - Profile
    - UserInfo
    - UserScores
    - GameCodePopup
*/

const newMockSession = { ...mockSession };
// Test uses fastcat821's id, to check if correct data is displayed.
newMockSession["user"]["id"] = "3d25cd31-de0b-47b2-95c8-88509fa7376b";

test("renders without crashing", () => {
    const div = document.createElement("div");
    render(
        <Profile session={mockSession} setGameState={null} setAccs={null} />,
        div
    );
});

test("userinfo is rendered", () => {
    render(
        <Profile session={mockSession} setGameState={null} setAccs={null} />
    );
    expect(screen.getByText("@testuser")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
});

test("userScores is rendered, and clicking on share button correctly renders gamecodepopup", async () => {
    render(
        <Profile session={newMockSession} setGameState={null} setAccs={null} />
    );
    await waitFor(() => screen.findByText("Group"), { timeout: 5000 });
    expect(screen.getByText("Group")).toBeInTheDocument();
    expect(screen.getByText("Score")).toBeInTheDocument();
    // Set up user
    const user = userEvent.setup();
    const shareBtn = screen.getAllByText("Share")[0];
    // click on button
    await user.click(shareBtn);
    await waitFor(() => screen.findByText("Copy"));
    expect(screen.getByText("Game link generated!")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
});
