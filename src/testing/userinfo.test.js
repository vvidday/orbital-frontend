import { render, screen } from "@testing-library/react";
import "../mocks/matchMedia";
import "@testing-library/jest-dom";
import { UserInfo } from "../components/userInfo";
import mockSession from "../data/mockSession";

test("renders without crashing", () => {
    const div = document.createElement("div");
    render(<UserInfo session={mockSession} />, div);
});

test("correctly renders profile information", () => {
    render(<UserInfo session={mockSession} />);
    expect(screen.getByText("@testuser")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
});
