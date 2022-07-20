// Component that is shown when users access site via a code (custom link)

import { Box, Button, CircularProgress, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { handlesToAccs } from "../logic/helpers";
import { idToHandles } from "../supabase/groupFunctions";

// Prompts user to start game.
export const GameCodePlay = ({ code, setAccs, setGameState }) => {
    const [localAccs, setLocalAccs] = useState([]);
    const [localHandles, setLocalHandles] = useState([]);
    // Loading state to wait for async call
    const [loading, setLoading] = useState(true);
    // Error state
    const [error, setError] = useState("");

    // On Component Mount, generate accs and handles from the code (group ID)
    useEffect(() => {
        idToHandles(code)
            .then((handles) => {
                if (handles === "Group does not exist") {
                    setError("Invalid game link.");
                }
                setLocalHandles(handles);
                return handlesToAccs(handles);
            })
            .then((accs) => {
                setLocalAccs(accs);
                setLoading(false);
            });
    }, []);

    function backToHomeScreen() {
        setGameState(0);
    }

    function startGame() {
        setAccs(localAccs);
        setGameState(1);
    }

    return (
        <Box>
            {loading ? (
                <Flex justifyContent="center">
                    <CircularProgress isIndeterminate color="#00acee" />
                </Flex>
            ) : (
                <Box>
                    {error === "" ? (
                        <Box>
                            <Text>You've been invited to play a game</Text>
                            {localHandles.map((handle, i) => (
                                <Text key={i}>@{handle}</Text>
                            ))}
                            <Button onClick={startGame}>Yes, start game</Button>
                            <Button onClick={backToHomeScreen}>
                                No, take me back
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            {error}
                            <Button onClick={backToHomeScreen}>Home</Button>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};
