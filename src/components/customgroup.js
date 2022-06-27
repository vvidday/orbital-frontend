import { Box, Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { getUserByUsername } from "../api/twitter";
import {
    generateGroupID,
    isDuplicate,
    newGroup,
} from "../supabase/groupFunctions";
import { Loading } from "./loadingScreen";

export const CustomGroup = ({ setGameState, setAccs }) => {
    // States of the eight input fields.
    const [one, setOne] = useState("");
    const [two, setTwo] = useState("");
    const [three, setThree] = useState("");
    const [four, setFour] = useState("");
    const [five, setFive] = useState("");
    const [six, setSix] = useState("");
    const [seven, setSeven] = useState("");
    const [eight, setEight] = useState("");

    // State to keep track & display error message for users
    const [error, setError] = useState("");

    // State for loading, just to disable button while async calls are running.
    const [loading, setLoading] = useState(false);

    const arr = [
        [one, setOne],
        [two, setTwo],
        [three, setThree],
        [four, setFour],
        [five, setFive],
        [six, setSix],
        [seven, setSeven],
        [eight, setEight],
    ];

    const playCustomGroup = async (handles) => {
        if (handles.length < 2) {
            setLoading(false);
            setError("Please input at least two usernames.");
        } else {
            const accounts = [];
            for (let i = 0; i < handles.length; i++) {
                const handle = handles[i];
                const res = await getUserByUsername(handle);
                if (res.data.id == null) {
                    setError(`${handle} is not a valid twitter username.`);
                    setLoading(false);
                    return;
                } else {
                    accounts.push(res.data);
                }
            }
            setError("");
            // Set accounts
            setAccs(accounts);
            // Check if group already exists
            const groupExists = await isDuplicate(handles);

            if (!groupExists) {
                // Create group
                newGroup(handles).then(() => {
                    setGameState(1);
                });
            }
            // Go next game state (start game)
            setGameState(1);
        }
    };

    return (
        <Box align="center">
            Custom Group (Input 2-8 twitter handles/usernames)
            <Flex padding="20px" flexWrap={"wrap"} justifyContent={"center"}>
                {arr.map((i, key) => {
                    return (
                        <Input
                            margin="10px 10px"
                            width="200px"
                            value={i[0]}
                            onChange={(e) => i[1](e.target.value)}
                            key={key}
                            id={`input${key}`}
                        ></Input>
                    );
                })}
            </Flex>
            <Center>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <Button
                        id="play-btn"
                        onClick={(e) => {
                            setLoading(true);
                            const handles = [];
                            arr.map((i) => {
                                if (i[0] != "") handles.push(i[0]);
                            });
                            console.log(handles);
                            playCustomGroup(handles);
                        }}
                    >
                        Play
                    </Button>
                )}
            </Center>
            <Center paddingTop="20px" color="red">
                {error}
            </Center>
        </Box>
    );
};
