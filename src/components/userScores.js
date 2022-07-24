import {
    Box,
    Flex,
    Button,
    Text,
    CircularProgress,
    Center,
    Wrap,
    WrapItem,
    Divider,
    Hide,
    Show,
    useDisclosure,
    HStack,
    Stack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { handlesToAccs } from "../logic/helpers";
import { idToHandles } from "../supabase/groupFunctions";
import { getProfileHelper } from "../supabase/leaderboardFunctions";
import { GameCodePopup } from "./gameCodePopup";

export const UserScores = ({ session, setGameState, setAccs }) => {
    // State to store the groups that the user has played in before
    const [groups, setGroups] = useState([]);
    // State to handle initial loading of groups
    const [loading, setLoading] = useState(true);

    // Disclosure for game code popup
    const { isOpen, onOpen, onClose } = useDisclosure();
    // State for game link
    const [gameLink, setGameLink] = useState("");
    const BASE_URL = "https://orbital-frontend-orcin.vercel.app/";
    // Function that generates game code popup when user clicks on share
    const generateGameCode = (groupID) => {
        // Present link to user
        setGameLink(BASE_URL + groupID);
        onOpen();
    };

    // Query database on load to retrieve groups.
    useEffect(() => {
        async function retrieveGroups() {
            const data = await getProfileHelper(session["user"]["id"]);
            // For each entry, convert id to handles and store in groups array
            const toGroups = [];
            for (let i = 0; i < data.length; i++) {
                const handles = await idToHandles(data[i]["groupID"]);
                const obj = {
                    groupID: data[i]["groupID"],
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
            <GameCodePopup
                isOpen={isOpen}
                opOpen={onOpen}
                onClose={onClose}
                gameLink={gameLink}
            />
            {loading ? (
                <Center>
                    <CircularProgress isIndeterminate color="#00acee" />
                </Center>
            ) : (
                <Flex margin="50px 50px" direction="column" justify="center">
                    <Center>
                        <Box>
                            <HStack
                                margin="10px 0px"
                                justify="space-between"
                                align="stretch"
                                width={{base:"90vw", lg: "70vw"}}
                            >
                                <Box width="80%"
                                    fontSize={{ base: "16px", sm: "24px" }}
                                    fontWeight="bold"
                                >
                                Group
                                </Box>
                                <Box>
                                    <Text
                                        fontSize={{ base: "16px", sm: "24px" }}
                                        fontWeight="bold"
                                    >
                                        Score
                                    </Text>
                                </Box>
                                <Stack direction={{base: "column", md:"row"}}>
                                    <Button height = "0" visibility="hidden">
                                        Play
                                    </Button>
                                    <Button height = "0"visibility="hidden">
                                        Share
                                    </Button>
                                </Stack>
                            </HStack>
                            <Divider size="xl" />
                        </Box>
                    </Center>
                    {groups.map((group, i) => {
                        return (
                            <Center>
                            <Box>
                                <HStack
                                    margin="10px 0px"
                                    justify="space-between"
                                    key={i}
                                    align="stretch"
                                    width={{base:"90vw", lg: "70vw"}}
                                >
                                    <Box width="80%">
                                    <Wrap>
                                        {group.handles.map((handle, i) => {
                                            return (
                                                <WrapItem key={i}>
                                                    <Text
                                                        fontStyle="italic"
                                                        key={i}
                                                        as="span"
                                                        marginRight="10px"
                                                        fontSize={{
                                                            base: "15px",
                                                            sm: "16px",
                                                        }}
                                                    >
                                                        @{handle}
                                                    </Text>
                                                </WrapItem>
                                            );
                                        })}
                                    </Wrap>
                                    </Box>
                                    <Box>
                                        <Center height="100%">
                                            {group.score}
                                        </Center>
                                        <Text
                                            fontSize={{ base: "16px", sm: "24px" }}
                                            fontWeight="bold"
                                            visibility="hidden"
                                            height="0"
                                        >
                                            Sigma
                                        </Text>
                                    </Box>
                                    <Center>
                                    <Stack direction={{base: "column", md:"row"}}>
                                        <Button
                                            onClick={async () => {
                                                setLoading(true);
                                                const accs =
                                                    await handlesToAccs(
                                                        group.handles
                                                    );
                                                setAccs(accs);
                                                setGameState(1);
                                            }}
                                        >
                                            Play
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                generateGameCode(group.groupID)
                                            }
                                        >
                                            Share
                                        </Button>
                                    </Stack>
                                    </Center>
                                </HStack>
                                <Divider size="xl" />
                            </Box>
                            </Center>
                        );
                    })}
                </Flex>
            )}
        </Box>
    );
};
