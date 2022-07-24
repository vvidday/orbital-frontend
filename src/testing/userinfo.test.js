import { render, screen } from "@testing-library/react";
import "../mocks/matchMedia";
import "@testing-library/jest-dom";
import { UserInfoImproved } from "../components/userInfoImproved";
import mockSession from "../data/mockSession";

test("renders without crashing", () => {
    const div = document.createElement("div");
    render(<UserInfoImproved session={mockSession} />, div);
});

test("correctly renders profile information", () => {
    render(<UserInfoImproved session={mockSession} />);
    expect(screen.getByText("@testuser")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
});
