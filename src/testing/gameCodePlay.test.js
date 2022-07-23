import { render, screen, waitFor } from "@testing-library/react";
import "../mocks/matchMedia";
import "@testing-library/jest-dom";
import { GameCodePlay } from "../components/gameCodePlay";

test("renders without crashing", () => {
    const div = document.createElement("div");
    render(
        <GameCodePlay
            code={"barackobamacristianojustinbieberkatyperry"}
            setGameState={null}
            setAccs={null}
        />,
        div
    );
});

test("correctly renders all elements based on the game code", async () => {
    render(
        <GameCodePlay
            code={"barackobamacristianojustinbieberkatyperry"}
            setGameState={null}
            setAccs={null}
        />
    );
    await waitFor(() => screen.getByText("Start Game"), { timeout: 10000 });
    expect(screen.getByText("@justinbieber")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(
        screen.getByText("You've been invited to play a game")
    ).toBeInTheDocument();
});
