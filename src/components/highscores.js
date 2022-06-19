import { useEffect, useState } from "react";
import { accsToHandles } from "../logic/helpers";
import { generateGroupID } from "../supabase/groupFunctions";
import { getGroupLB } from "../supabase/leaderboardFunctions";
import { Box, Grid, GridItem, Heading, Text, Button } from "@chakra-ui/react";

export const Highscores = ({ accs, setGameState }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Retrieve leaderboard entries from database
        const handles = accsToHandles(accs);
        const groupID = generateGroupID(handles);
        getGroupLB(groupID).then((data) => {
            // Sort by Scores
            data.sort((a, b) => b.score - a.score);
            setData(data);
        });
    }, []);

    return (
        <Box>
            <Heading padding="20px" align="center">
                Highscores
            </Heading>
            <Text align="center" fontStyle="italic" paddingBottom="40px">
                {accs.map((acc, i) =>
                    i === accs.length - 1
                        ? `@${acc.username}`
                        : `@${acc.username}         `
                )}
            </Text>
            <Box>
                <Grid
                    templateColumns="repeat(2, 1fr)"
                    align="center"
                    paddingBottom="20px"
                >
                    <GridItem>
                        <Heading>Player</Heading>
                    </GridItem>
                    <GridItem>
                        <Heading>Score</Heading>
                    </GridItem>
                </Grid>
                {data.map((entry, i) => {
                    return (
                        <Grid
                            templateColumns="repeat(2, 1fr)"
                            align="center"
                            key={i}
                        >
                            <GridItem>
                                {entry.playerName ?? entry.playerNameAnon}{" "}
                            </GridItem>
                            <GridItem>{entry.score}</GridItem>
                        </Grid>
                    );
                })}
            </Box>
            <Box paddingTop="30px" align="center">
                <Button margin="10px" onClick={() => setGameState(1)}>
                    Play Again
                </Button>
                <Button margin="10px" onClick={() => setGameState(0)}>
                    Choose Different Group
                </Button>
            </Box>
        </Box>
    );
};
