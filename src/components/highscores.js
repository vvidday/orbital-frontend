import { useEffect, useState } from "react";
import { accsToHandles } from "../logic/helpers";
import { generateGroupID } from "../supabase/groupFunctions";
import { getGroupLB } from "../supabase/leaderboardFunctions";
import {
    Box,
    Grid,
    GridItem,
    Heading,
    Text,
    Button,
    Flex,
    Center,
    Tooltip,
} from "@chakra-ui/react";
import { advancedStats } from "../supabase/statisticsGroupFunctions";

export const Highscores = ({ accs, setGameState }) => {
    const [data, setData] = useState([]);
    /* Advanced statistics */
    // Least Predictable - LOWEST percentage. Stored as object
    const [least, setLeast] = useState({});
    // Most Predictable - HIGHEST percentage.
    const [most, setMost] = useState({});

    useEffect(() => {
        // Retrieve leaderboard entries from database
        const handles = accsToHandles(accs);
        const groupID = generateGroupID(handles);
        getGroupLB(groupID).then((data) => {
            // Sort by Scores
            data.sort((a, b) => b.score - a.score);
            setData(data);
        });
        // Retrieve advanced statistics
        advancedStats(groupID).then((data) => {
            // Sort by percentage
            data.sort((a, b) => b.percentage - a.percentage);
            setMost({ ...data[0] });
            setLeast({ ...data[data.length - 1] });
        });
    }, []);

    const advancedStatistics = (
        <Flex>
            <Flex direction="column" align="center" margin="30px">
                <Text align="center" fontSize="24px">
                    Most Predictable
                </Text>
                <Text fontStyle="italic">@{most["username"]}</Text>
                <Text align="center">
                    Their tweets were guessed correctly{" "}
                    <Tooltip
                        label={`Out of ${
                            most["correct"] + most["wrong"]
                        } guesses, ${most["correct"]} were correct!`}
                    >
                        <Text as="span" color="green" fontWeight="bold">
                            {most["percentage"]}%
                        </Text>
                    </Tooltip>{" "}
                    of the time!
                </Text>
            </Flex>
            <Flex direction="column" align="center" margin="30px">
                <Text align="center" fontSize="24px">
                    Least Predictable
                </Text>
                <Text fontStyle="italic">@{least["username"]}</Text>
                <Text align="center">
                    Their tweets were guessed correctly only{" "}
                    <Tooltip
                        label={`Out of ${
                            least["correct"] + least["wrong"]
                        } guesses, only ${least["correct"]} were correct!`}
                    >
                        <Text as="span" color="red" fontWeight="bold">
                            {least["percentage"]}%
                        </Text>
                    </Tooltip>{" "}
                    of the time!
                </Text>
            </Flex>
        </Flex>
    );

    return (
        <Box>
            <Center>{advancedStatistics}</Center>
            <Heading padding="20px" align="center">
                Highscores
            </Heading>
            <Text align="center" fontStyle="italic" paddingBottom="40px">
                {accs.map((acc, i) =>
                    i === accs.length - 1
                        ? `@${acc.username}`
                        : `@${acc.username} `
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
                            id={`hsentry${i}`}
                            templateColumns="repeat(2, 1fr)"
                            align="center"
                            key={i}
                        >
                            <GridItem id={`name${i}`}>
                                {entry.playerName ?? entry.playerNameAnon}{" "}
                            </GridItem>
                            <GridItem id={`score${i}`}>{entry.score}</GridItem>
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
