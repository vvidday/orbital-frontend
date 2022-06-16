import { Nav } from "./components/nav";
import { useState } from "react";
import { GameTest } from "./components/gameTesting";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Loading } from "./components/loadingScreen";

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
    const [toggle, setToggle] = useState();
    
    return (
        <Box className="App">
            <Nav setToggle={setToggle}/>
            <Loading accounts={accounts} colorToggle = {toggle}/>
        </Box>   
    );
}

export default App;
