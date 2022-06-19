import { render, screen, fireEvent } from "@testing-library/react";
import { Nav } from "../components/nav";
import React from "react";
import "@testing-library/jest-dom";
import { getByTestId } from "@testing-library/react";

test("renders without crashing", () => {
    render(<Nav />);
    expect(screen.getByText("Toggle Mode")).toBeInTheDocument();
});
