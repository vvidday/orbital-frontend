import { Nav } from "./components/nav";
import { Game } from "./components/game";
import { ApiTest } from "./components/apitesting";
import { useEffect, useState } from "react";
import { GameTest } from "./components/gametesting";
import { Box } from "@chakra-ui/react";

import { GameImproved } from "./components/game-improved";
import bufferData from "./logic/buffer";

import { Highscores } from "./components/highscores";
import { Loading } from "./components/loading_screen";
import { SubmitScore } from "./components/submitscore";

function App() {
    const accounts = [
        { id: "27260086", name: "Justin Bieber", username: "justinbieber" },
        { id: "813286", name: "Barack Obama", username: "BarackObama" },
        { id: "21447363", name: "KATY PERRY", username: "katyperry" },
        { id: "155659213", name: "Cristiano Ronaldo", username: "Cristiano" },
        { id: "18839785", name: "Narendra Modi", username: "narendramodi" },
        { id: "25365536", name: "Kim Kardashian", username: "KimKardashian" },
        { id: "50393960", name: "Bill Gates", username: "BillGates" },
    ];

    // Accounts representing the current group to be played
    const [accs, setAccs] = useState([
        { id: "27260086", name: "Justin Bieber", username: "justinbieber" },
        { id: "813286", name: "Barack Obama", username: "BarackObama" },
        { id: "21447363", name: "KATY PERRY", username: "katyperry" },
        { id: "155659213", name: "Cristiano Ronaldo", username: "Cristiano" },
    ]);
    /* State of game to determine which component to render
    0 - Default, render group select screen [TODO]
    1 - Start of game [FOR NOW, DEFAULT]
    2 - On submit score screen
    3 - On highscore screen
    */
    const [gameState, setGameState] = useState(1);

    const [testing, setTesting] = useState(true);
    //setSize(data.length == 0);
    /* 
        Buffers the data.

        -------> WARNING!!! <-------
        Before editing this file, please comment out the useEffect.
        Or else the array will grow in size until refresh.
    */
    //useEffect(() => {
    //bufferData(accounts, 5);
    //},[]);

    let displayComponent;

    if (gameState === 1)
        displayComponent = (
            <Loading accounts={accs} setGameState={setGameState} />
        );
    if (gameState === 2)
        displayComponent = (
            <SubmitScore setGameState={setGameState} accs={accs} />
        );
    if (gameState === 3)
        displayComponent = (
            <Highscores setGameState={setGameState} accs={accs} />
        );

    return (
        <Box className="App">
            <Nav testing={testing} setTesting={setTesting} />
            {displayComponent}
        </Box>
    );
}

export default App;
