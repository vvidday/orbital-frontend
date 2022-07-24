import {
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import "../mocks/matchMedia";
import { Highscores } from "../components/highscores";

const MOCK_ACCOUNTS = [
    { id: "27260086", name: "Justin Bieber", username: "justinbieber" },
    { id: "813286", name: "Barack Obama", username: "BarackObama" },
    { id: "21447363", name: "KATY PERRY", username: "katyperry" },
    { id: "155659213", name: "Cristiano Ronaldo", username: "Cristiano" },
];

test("renders without crashing", () => {
    const div = document.createElement("div");
    render(<Highscores accs={MOCK_ACCOUNTS} setGameState={null} />, div);
});

test("correct elements are rendered", () => {
    render(<Highscores accs={MOCK_ACCOUNTS} setGameState={null} />);
    // Check for predictability
    expect(screen.getByText("Most Predictable")).toBeInTheDocument();
    expect(screen.getByText("Least Predictable")).toBeInTheDocument();
    expect(screen.getByText("Play Again")).toBeInTheDocument();
    expect(screen.getByText("Choose Different Group")).toBeInTheDocument();
    expect(screen.getByText("Share Group")).toBeInTheDocument();
});
