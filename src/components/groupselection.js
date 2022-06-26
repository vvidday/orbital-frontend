import { Box, Flex, Textarea } from "@chakra-ui/react";
import { Group } from "./group";
import { CustomGroup } from "./customgroup";
import { useEffect, useState } from "react";
import { resetData } from "../data/bufferData";

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

export const Selection = ({ setGameState, setAccs }) => {
    // Loading state to disable buttons / clickables when loading the async calls.
    const [loading, setLoading] = useState(false);

    // Reset data on load... change to state!!!
    useEffect(() => {
        resetData();
    });

    return (
        <Box>
            {loading ? (
                <Box>Loading...</Box>
            ) : (
                <Box>
                    <Flex justify={"space-around"} flexFlow="row wrap">
                        {DEFAULT_GROUPS.map((group, i) => {
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
                        })}
                    </Flex>
                    <CustomGroup
                        setGameState={setGameState}
                        setAccs={setAccs}
                    />
                </Box>
            )}
        </Box>
    );
};
