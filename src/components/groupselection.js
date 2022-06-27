import { Box, ButtonGroup } from "@chakra-ui/react";
import { supabase } from "../supabase/supabaseClient";
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
    }
];

export const Selection = ({ setGameState, accs, setAccs, session }) => {
    // Loading state to disable buttons / clickables when loading the async calls.
    const [loading, setLoading] = useState(false);
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

    // Reset data on load... change to state!!!
    useEffect(() => {
        resetData();
    });
    // maps Your Following button to the selection when the user logs in
        // if user logs out, it is removed
        // if user logs in at any time, the button is added
    useEffect(() => {
        if (supabase.auth.user() != null) {
            if (DEFAULT_GROUPS[DEFAULT_GROUPS.length-1].title == "Your Following") {
                DEFAULT_GROUPS[DEFAULT_GROUPS.length-1] = {
                    title: "Your Following",
                    handles: accs.map((i) => i.username)
                }
                setHandle(
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
                }))
            } else {
                // handles initial case when accs is not loaded yet
                    // refreshes this part when accs is added
                    // also refreshes when user logs out
                DEFAULT_GROUPS.push({
                    title: "Your Following",
                    handles: accs.map((i) => i.username)
                })
            }
        }
    },[accs, session]);
    console.log(DEFAULT_GROUPS);
    return (
        <Box>
            {loading ? (
                <Box>Loading...</Box>
            ) : (
                <Box>
                    <ButtonGroup 
                        display="flex"
                        justify="space-around"
                        flexFlow="row wrap"
                        justifyContent="center"
                    >
                        {/*DEFAULT_GROUPS.map((group, i) => {
                            console.log("below");
                            console.log(group);
                            console.log("above");
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
                        })*/handleArray}
                    </ButtonGroup>
                    <CustomGroup
                        setGameState={setGameState}
                        setAccs={setAccs}
                    />
                </Box>
            )}
        </Box>
    );
};
