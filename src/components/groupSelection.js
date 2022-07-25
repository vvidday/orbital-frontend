import {
    Box,
    Wrap,
    Flex,
    CircularProgress,
    useDisclosure,
    Button,
    Center,
    Collapse,
    Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import { Group } from "./group";
import { CustomGroup } from "./customgroup";
import { useEffect, useState } from "react";
import { resetData } from "../data/bufferData";

import { supabase } from "../supabase/supabaseClient";
import {
    doesProfileExist,
    doesNewUserExist,
} from "../supabase/profileFunctions";
import { checkLimit } from "../supabase/yourFollowingFunctions";
import { YourFollowing } from "./yourFollowing";

const DEFAULT_GROUPS = [
    {
        title: "Default",
        handles: ["BarackObama", "Cristiano", "justinbieber", "katyperry"],
    },
    {
        title: "MMA",
        handles: ["TheNotoriousMMA", "USMAN84kg", "JonnyBones", "bullyb170"],
    },
    {
        title: "US Politics",
        handles: ["AOC", "BernieSanders", "tedcruz", "POTUS", "DonaldjTrumpJR"],
    },
    {
        title: "Twitch",
        handles: ["xQc", "summit1g", "shroud", "loltyler1", "timthetatman"],
    },
];

export const Selection = ({ setGameState, accs, setAccs, session }) => {
    // Loading state to disable buttons / clickables when loading the async calls.
    const [loading, setLoading] = useState(false);
    const [yourFollowing, setYourFollowing] = useState(false);
    const [customButton, setCustomButton] = useState("Build Custom Group");
    const [handleArray, setHandle] = useState(
        DEFAULT_GROUPS.map((group, i) => {
            return (
                <Group
                    key={i}
                    title={group.title}
                    handles={group.handles}
                    setAccs={setAccs}
                    setGameState={setGameState}
                    setLoading={setLoading}
                />
            );
        })
    );
    // State for custom group collapse
    const { isOpen, onToggle } = useDisclosure();

    useEffect(() => {
        if (session != null && supabase.auth.user() != null) {
            const fetchData = async () => {
                const userID = session.user.user_metadata.provider_id;
                // if there are no errors, it means that either currently user's data is updated
                // or the updating criteria is not met yet
                // or its a new user and the update is successful
                try {
                    const response = await checkLimit(session); // tries to update the databse
                    setYourFollowing(true);
                } catch (error) {
                    // error occurs when the limit is reached for an existing user
                    // which we fetch an older following data
                    // or its a new user, which the new user needs to continue to wait
                    const doesExistNewUser = await doesNewUserExist(session);
                    if (!doesExistNewUser) {
                        // user already exists
                        setYourFollowing(true);
                    } else {
                        // its a new user
                        setYourFollowing(false);
                    }
                }
            };
            fetchData().catch(console.error);
        }
    }, [session]);

    // Reset data on load... change to state!!!
    useEffect(() => {
        resetData();
    });

    // Update Custom Button text upon collapse / show
    useEffect(() => {
        if (isOpen) {
            setCustomButton(
                <Center>
                    <ArrowBackIcon />
                    <Text>Back To Selection</Text>
                </Center>
            );
        } else {
            setCustomButton("Build Custom Group");
        }
    }, [isOpen]);
    return (
        <Box>
            {loading ? (
                <Flex justifyContent="center">
                    <CircularProgress isIndeterminate color="#00acee" />
                </Flex>
            ) : (
                <Box>
                    <Collapse in={!isOpen} animateOpacity>
                        <Wrap
                            spacing="20px"
                            justify="center"
                            align={{ base: "center", sm: "stretch" }}
                            direction={{ base: "column", sm: "row" }}
                        >
                            {handleArray}
                        </Wrap>
                    </Collapse>
                    <Center>
                        <Flex flexDir={{ base: "column", sm: "row" }}>
                            <Center padding="0px">
                            <Button
                                border="1px"
                                borderRadius="10px"
                                flexDirection="column"
                                width={{ base: "60vw", sm: "auto" }}
                                minWidth="50px"
                                marginTop="10px"
                                justifyContent="space-between"
                                padding="10px"
                                _hover={{
                                    cursor: "pointer",
                                    background: "whiteAlpha.300",
                                }}
                                id="custom-btn"
                                onClick={onToggle}
                            >
                                {customButton}
                            </Button>
                            </Center>
                            <Box>
                            <Collapse in={!isOpen} animateOpacity>
                                {session ? (
                                    <YourFollowing
                                        setGameState={setGameState}
                                        accs={accs}
                                        setAccs={setAccs}
                                        session={session}
                                        following={yourFollowing}
                                        setLoading={setLoading}
                                    />
                                ) : (
                                    <></>
                                )}
                            </Collapse>
                            </Box>
                        </Flex>
                    </Center>
                    <Collapse in={isOpen} animateOpacity>
                        <CustomGroup
                            setGameState={setGameState}
                            setAccs={setAccs}
                        />
                    </Collapse>
                </Box>
            )}
        </Box>
    );
};
