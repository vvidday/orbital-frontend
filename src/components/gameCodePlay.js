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
                        <Flex direction="column" align="center">
                            <Text
                                fontSize={{
                                    base: "large",
                                    sm: "2xl",
                                }}
                            >
                                You've been invited to play a game
                            </Text>
                            <Flex
                                direction={{ base: "column", sm: "row" }}
                                margin="10px"
                            >
                                {localHandles.map((handle, i) => (
                                    <Text
                                        key={i}
                                        margin="5px"
                                        fontStyle="italic"
                                    >
                                        @{handle}
                                    </Text>
                                ))}
                            </Flex>
                            <Flex>
                                <Button margin="20px" onClick={startGame}>
                                    Start Game
                                </Button>
                                <Button
                                    margin="20px"
                                    onClick={backToHomeScreen}
                                >
                                    Home
                                </Button>
                            </Flex>
                        </Flex>
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
