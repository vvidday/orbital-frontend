import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { newLBEntryAnon } from "../supabase/leaderboardFunctions";
import { accsToHandles } from "../logic/helpers";
import { generateGroupID } from "../supabase/groupFunctions";
// Change score to state...
import { score } from "./score";

export const SubmitScore = ({ setGameState, accs }) => {
    const [name, setName] = useState("");

    const handleSubmit = () => {
        // ANONYMOUS - Create new entry in database
        const handles = accsToHandles(accs);
        console.log(handles);
        const groupID = generateGroupID(handles);
        newLBEntryAnon(groupID, name, score).then(() => setGameState(3));
    };

    return (
        <Box>
            <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            ></Input>
            <Button onClick={handleSubmit}>Submit Score</Button>
        </Box>
    );
};
