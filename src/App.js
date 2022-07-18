import { Nav } from "./components/nav";
import { useEffect, useState } from "react";
import { Highscores } from "./components/highscores";
import { HighscoresImproved } from "./components/highscoresImproved";
import { SubmitScore } from "./components/submitscore";
import { SubmitScoreImproved } from "./components/submitscoreImproved";
import { supabase } from "./supabase/supabaseClient";
import { handleProfileOnLogin } from "./supabase/profileFunctions";
import { Box, Flex} from "@chakra-ui/react";
import { Loading } from "./components/loadingScreen";
import { Selection } from "./components/groupselection";
import { SelectionImproved } from "./components/groupSelectionImproved";
import { Profile } from "./components/profile";

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
    /*
    // Accounts representing the current group to be played
    const [accs, setAccs] = useState([
        { id: "27260086", name: "Justin Bieber", username: "justinbieber" },
        { id: "813286", name: "Barack Obama", username: "BarackObama" },
        { id: "21447363", name: "KATY PERRY", username: "katyperry" },
        { id: "155659213", name: "Cristiano Ronaldo", username: "Cristiano" },
    ]);
    */
    const [accs, setAccs] = useState([]);
    /* State of game to determine which component to render
    -1 - Profile page
    0 - Default, render group select screen [DEFAULT]
    1 - Start of game 
    2 - On submit score screen
    3 - On highscore screen
    */
    const [gameState, setGameState] = useState(0);

    // State to store session data
    const [session, setSession] = useState(null);

    // Referring to color toggle(?) to be controlled in nav for now
    const [toggle, setToggle] = useState();

    // New state to store game data
    /**
     * {account: {id: name: username:}, tweets: [{id: text: }]}
     */
    const [gameData, setGameData] = useState([]);

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
            // Back to selection
            setGameState(0);
        });
    }, []);
    let displayComponent;
    if (gameState === -1) {
        displayComponent = (
            <Profile
                session={session}
                setGameState={setGameState}
                setAccs={setAccs}
            />
        );
    }
    if (gameState === 0) {
        displayComponent = (
            <SelectionImproved
                session={session}
                setGameState={setGameState}
                accs={accs}
                setAccs={setAccs}
            />
        );
    }
    if (gameState === 1) {
        //console.log("starting to load");
        //console.log(accs);
        displayComponent = (
            //<div>{JSON.stringify(session)}</div>

            <Loading
                accounts={accs}
                setGameState={setGameState}
                colorToggle={toggle}
                gameData={gameData}
                setGameData={setGameData}
            />
        );
    }
    if (gameState === 2)
        displayComponent = (
            <SubmitScoreImproved
                setGameState={setGameState}
                accs={accs}
                session={session}
            />
        );
    if (gameState === 3)
        displayComponent = (
            <HighscoresImproved setGameState={setGameState} accs={accs} />
        );

    return (
        <Box 
            className="App" 
            bgGradient = {() => {
                if (toggle == "dark") {
                    //'linear(to-b, #091523 70%, #000000)'
                    return 'linear(to-b, #091523, #000000)'
                }
                //'linear(to-b, #00c6ff 70%, #0072ff)''linear(to-b, #eaeaea, #dbdbdb, #f2f2f2, #ada996)'
            }}
            h="100vh"
            overflow="auto"
        >
            <Nav
                setGameState={setGameState}
                session={session}
                setSession={setSession}
                setToggle={setToggle}
            />
            <Box marginTop="30px">
                {displayComponent}
            </Box>
        </Box>
    );
}

export default App;
