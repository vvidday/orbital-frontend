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
    Divider,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import { advancedStats } from "../supabase/statisticsGroupFunctions";
import { GameCodePopup } from "./gameCodePopup";

export const Highscores = ({ accs, setGameState }) => {
    const [data, setData] = useState([]);
    /* Advanced statistics */
    // Least Predictable - LOWEST percentage. Stored as object
    const [least, setLeast] = useState({});
    // Most Predictable - HIGHEST percentage.
    const [most, setMost] = useState({});
    const [hsbutton, setHighscoreButton] = useState("");
    const { isOpen, onToggle } = useDisclosure();
    // Disclosure for game links + state for game links.
    const {
        isOpen: isOpen2,
        onOpen: onOpen2,
        onClose: onClose2,
    } = useDisclosure();
    // Disclosure for game links + state for game links.
    const {
        isOpen: isOpen3,
        onOpen: onOpen3,
        onClose: onClose3,
    } = useDisclosure();
    const [gameLink, setGameLink] = useState("");
    const BASE_URL = "https://orbital-frontend-orcin.vercel.app/";

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
        // Set game link with groupID
        setGameLink(BASE_URL + groupID);
    }, []);

    useEffect(() => {
        //console.log(hsbutton);
        if (isOpen === true) {
            setHighscoreButton("Hide Highscore");
        } else {
            setHighscoreButton("Show Highscore");
        }
    }, [isOpen]);

    const advancedStatistics = (
        <Flex>
            <Flex
                direction="column"
                align="center"
                margin="30px 15px 30px 30px"
                backdropFilter="auto"
                boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                bgColor="rgba(255,255,255, 0.1)"
                padding="10px"
                borderRadius="lg"
            >
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
            <Flex
                direction="column"
                align="center"
                margin="30px 30px 30px 15px"
                backdropFilter="auto"
                boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                bgColor="rgba(255,255,255, 0.1)"
                padding="10px"
                borderRadius="lg"
            >
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
                        <Text as="span" color="firebrick" fontWeight="bold">
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
            <GameCodePopup
                isOpen={isOpen2}
                onOpen={onOpen2}
                onClose={onClose2}
                gameLink={gameLink}
            />
            <Center>{advancedStatistics}</Center>
            <Text align="center" fontStyle="italic" marginTop="30px">
                {accs.map((acc, i) =>
                    i === accs.length - 1
                        ? `@${acc.username}`
                        : `@${acc.username} `
                )}
            </Text>
            <Box paddingTop="30px" align="center">
                <Button margin="10px" onClick={() => setGameState(1)}>
                    Play Again
                </Button>
                <Button margin="10px" onClick={() => setGameState(0)}>
                    Choose Different Group
                </Button>
                <Button margin="10px" onClick={() => onOpen2()}>
                    Share Group
                </Button>
            </Box>
            <Center>
                <Button onClick={onOpen3} marginTop="10px">
                    {hsbutton}
                </Button>
            </Center>

            <Drawer
                size="lg"
                placement="right"
                onClose={onClose3}
                isOpen={isOpen3}
            >
                <DrawerOverlay />
                <DrawerContent overflow="scroll">
                    <DrawerCloseButton />
                    <Box marginTop="30px">
                        <Grid
                            templateColumns="repeat(2, 1fr)"
                            align="center"
                            paddingBottom="20px"
                        >
                            <GridItem>
                                <Heading size="lg">Player</Heading>
                            </GridItem>
                            <GridItem>
                                <Heading size="lg">Score</Heading>
                            </GridItem>
                        </Grid>
                        {data.map((entry, i) => {
                            return (
                                <Box key={`hs${i}`}>
                                    <Grid
                                        id={`hsentry${i}`}
                                        templateColumns="repeat(2, 1fr)"
                                        align="center"
                                        key={i}
                                    >
                                        <GridItem id={`name${i}`}>
                                            {entry.playerName ??
                                                entry.playerNameAnon}{" "}
                                        </GridItem>
                                        <GridItem id={`score${i}`}>
                                            {entry.score}
                                        </GridItem>
                                    </Grid>
                                    <Center key={`hsdivider${i}`}>
                                        <Divider
                                            width={{
                                                base: "100vw",
                                                md: "75vw",
                                            }}
                                        />
                                    </Center>
                                </Box>
                            );
                        })}
                    </Box>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};
