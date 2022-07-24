import { Box, Button, Input, CircularProgress, Flex, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { newLBEntryAnon, updateLB } from "../supabase/leaderboardFunctions";
import { accsToHandles } from "../logic/helpers";
import { generateGroupID } from "../supabase/groupFunctions";
// Change score to state...
import { score } from "./score";

export const SubmitScoreImproved = ({ setGameState, accs, session }) => {
    const [name, setName] = useState("");

    // UseEffect hook that hanldes logged in user. Instead of prompting for name, it handles submission automatically.
    useEffect(() => {
        if (session != null) {
            const handles = accsToHandles(accs);
            const groupID = generateGroupID(handles);
            updateLB(
                groupID,
                session["user"]["id"],
                session["user"]["user_metadata"]["user_name"],
                score
            ).then(() => {
                setGameState(3);
            });
        }
    }, []);

    const handleSubmit = () => {
        // ANONYMOUS - Create new entry in database
        const handles = accsToHandles(accs);
        const groupID = generateGroupID(handles);
        newLBEntryAnon(groupID, name, score).then(() => setGameState(3));
    };

    return (
        <Box>
            {session ? (
                <Flex justifyContent="center">
                    <CircularProgress 
                        isIndeterminate 
                        color="#00acee"
                    />
                </Flex>
            ) : (
                <Center flexDir="column">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
                        <Input
                            id="submit-name-input"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            width="90vw"
                            autoComplete="off"
                        ></Input>
                    </form>
                    <Button 
                        id="submit-name-btn" 
                        onClick={handleSubmit}
                        marginTop="10px"
                    >
                        Submit Score
                    </Button>
                </Center>
            )}
        </Box>
    );
};
