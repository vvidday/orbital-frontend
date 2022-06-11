import { Nav } from "./components/nav";
import { Game } from "./components/game";
import { ApiTest } from "./components/apitesting";
import { useEffect, useState } from "react";
import { GameTest } from "./components/gametesting";
import { Box } from "@chakra-ui/react";

import { GameImproved } from "./components/game-improved";
import bufferData from "./logic/buffer";

import { Loading } from "./components/loading_screen";

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

    return (
        <Box className="App">
            <Nav testing={testing} setTesting={setTesting} />
            {testing ? (
                <GameTest accounts={accounts} />
            ) : (
                <Loading accounts={accounts} />
            )}
        </Box>
    );
}

export default App;
