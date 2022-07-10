import { Box, Flex, Button, Heading, Text, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { handlesToAccs } from "../logic/helpers";
import { idToHandles } from "../supabase/groupFunctions";
import { getProfileHelper } from "../supabase/leaderboardFunctions";

export const UserScores = ({ session, setGameState, setAccs }) => {
    // State to store the groups that the user has played in before
    const [groups, setGroups] = useState([]);
    // State to handle initial loading of groups
    const [loading, setLoading] = useState(true);

    // Query database on load to retrieve groups.
    useEffect(() => {
        async function retrieveGroups() {
            const data = await getProfileHelper(session["user"]["id"]);
            // For each entry, convert id to handles and store in groups array
            const toGroups = [];
            for (let i = 0; i < data.length; i++) {
                const handles = await idToHandles(data[i]["groupID"]);
                const obj = {
                    handles: handles,
                    score: data[i]["score"],
                };
                toGroups.push(obj);
            }
            setGroups(toGroups);
            setLoading(false);
        }
        retrieveGroups();
    }, []);

    return (
        <Box>
            {loading ? (
                <>Loading...</>
            ) : (
                <Flex margin="50px 50px" direction="column" justify="center">
                    <Flex margin="10px 0px" justify="space-between">
                        <Text width="80%" fontSize="24px" fontWeight="bold">
                            Group
                        </Text>
                        <Text fontSize="24px" fontWeight="bold">
                            Score
                        </Text>
                        <Button visibility="hidden">Play</Button>
                    </Flex>
                    {groups.map((group, i) => {
                        return (
                            <Flex
                                margin="10px 0px"
                                justify="space-between"
                                key={i}
                                align="center"
                            >
                                <Box width="80%" overflow="hidden">
                                    {group.handles.map((handle, i) => {
                                        return (
                                            <Text
                                                fontStyle="italic"
                                                key={i}
                                                as="span"
                                                marginRight="10px"
                                            >
                                                @{handle}
                                            </Text>
                                        );
                                    })}
                                </Box>
                                {group.score}{" "}
                                <Button
                                    onClick={async () => {
                                        setLoading(true);
                                        const accs = await handlesToAccs(
                                            group.handles
                                        );
                                        setAccs(accs);
                                        setGameState(1);
                                    }}
                                >
                                    Play
                                </Button>
                            </Flex>
                        );
                    })}
                </Flex>
            )}
        </Box>
    );
};
