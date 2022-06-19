import { Nav } from "./components/nav";
import { useEffect, useState } from "react";
import { Highscores } from "./components/highscores";
import { SubmitScore } from "./components/submitscore";
import { supabase } from "./supabase/supabaseClient";
import { getFollowing } from "./api/twitter";
import { handleProfileOnLogin } from "./supabase/profileFunctions";
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

    // State to store session data
    const [session, setSession] = useState(null);

    // Referring to color toggle(?) to be controlled in nav for now
    const [toggle, setToggle] = useState();

    // useEffect that sets up supabase to update session everytime auth updates
    useEffect(() => {
        // Taken from supabase docs - sets session
        setSession(supabase.auth.session());
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            // If session is not null, it means someone just logged in. Hence, handle profile.
            if (session != null) {
                return handleProfileOnLogin(session);
            }
        });
    }, []);

    let displayComponent;

    if (gameState === 1)
        displayComponent = (
            //<div>{JSON.stringify(session)}</div>

            <Loading
                accounts={accs}
                setGameState={setGameState}
                colorToggle={toggle}
            />
        );
    if (gameState === 2)
        displayComponent = (
            <SubmitScore
                setGameState={setGameState}
                accs={accs}
                session={session}
            />
        );
    if (gameState === 3)
        displayComponent = (
            <Highscores setGameState={setGameState} accs={accs} />
        );

    return (
        <Box className="App">
            <Nav
                session={session}
                setSession={setSession}
                setToggle={setToggle}
            />
            {displayComponent}
        </Box>
    );
}

export default App;
