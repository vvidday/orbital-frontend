import { Box, ButtonGroup } from "@chakra-ui/react";
import { supabase } from "../supabase/supabaseClient";
import { Group } from "./group";
import { CustomGroup } from "./customgroup";
import { useEffect, useState } from "react";
import { resetData } from "../data/bufferData";
import { getFollowing } from "../api/twitter";
import {
    isDuplicate,
    newGroup,
} from "../supabase/groupFunctions";

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

    // userEffect for fetching information for user's followings
        // refreshes this when session loads since it is initially null
    useEffect(() => {
        accs = []
        if (session != null && supabase.auth.user() != null) {
            // gets user id if logged in
            const fetchData = async () => {
                const userID = session.user.user_metadata.provider_id
                const response = await getFollowing(userID);
                //const response = [
                //    "BarackObama", "Cristiano", "justinbieber", "katyperry",
                //    "TheNotoriousMMA", "USMAN84kg", "JonnyBones", "bullyb170",
                //    "AOC", "BernieSanders", "tedcruz", "POTUS", "DonaldjTrumpJR",
                //    "xQc", "summit1g", "shroud", "loltyler1", "timthetatman"
                //];
                if (response.length > 8) {
                    const newAccs = [];
                    let i = 0;
                    while (i < 8) {
                        const random = Math.floor(Math.random() * response.length);
                        newAccs.push(response[random]);
                        response.splice(random, 1);
                        i+=1;
                    }
                    console.log(newAccs);
                    setAccs(newAccs);
                } else {
                    setAccs(response);
                }
                console.log(accs);
            }
            fetchData().catch(console.error);
            console.log(accs);
        }
    }, [session]);

    // maps Your Following button to the selection when the user logs in
        // if user logs out, it is removed
        // if user logs in at any time, the button is added
    useEffect(() => {
        if (supabase.auth.user() != null) {
            if (DEFAULT_GROUPS[DEFAULT_GROUPS.length-1].title == "Your Following") {
                const userHandles = accs.map((i) => i.username)
                DEFAULT_GROUPS[DEFAULT_GROUPS.length-1] = {
                    title: "Your Following",
                    handles: userHandles
                }
                const playUserGroup = async (currentHandles) => {
                    const groupExists = await isDuplicate(currentHandles);
                    if (!groupExists) {
                        // Create group
                        newGroup(currentHandles).then(() => {
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
                            }));
                        });
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
                    }));
                };
                playUserGroup(userHandles);
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
