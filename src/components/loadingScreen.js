import React, { useEffect } from "react";
import { useState } from "react";
import { data } from "../data/bufferData";
import { Box, Text, CircularProgress, Flex } from "@chakra-ui/react";
import { GameImproved } from "./gameImproved";
import bufferData from "../logic/buffer";
import { buffer } from "../logic/buffer";
import { tweetLookup } from "../api/twitter";

export const Loading = ({
    accounts,
    colorToggle,
    setGameState,
    gameData,
    setGameData,
}) => {
    //const [reload, setReload] = useState();
    //const [length, setLength] = useState(0);
    //const BUFFER_SIZE = 5;

    // useEffect(() => {
    //     if (accounts.length != 0) {
    //         bufferData(accounts, BUFFER_SIZE);
    //     }
    // }, [accounts]);

    // useEffect(() => {
    //     setLength(data.length);
    // }, [reload]);

    // INITIAL values for first round, this will be passed to game component
    // Contains result, post, choices.
    const [initialResult, setInitialResult] = useState({});
    const [initialPost, setInitialPost] = useState({});
    const [initialChoices, setInitialChoices] = useState([...accounts]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        buffer(accounts)
            .then((data) => {
                //setGameData(data)
                // First round of game loop
                // Pick a random account from accounts array
                const index = Math.floor(Math.random() * accounts.length);
                const randomAccount = accounts[index];
                // Result
                setInitialResult(randomAccount);
                // Iterate through data to find corresponding account
                for (let i = 0; i < data.length; i++) {
                    if (data[i]["account"]["id"] === randomAccount["id"]) {
                        // Select a random tweet from tweets array
                        const tweetIndex = Math.floor(
                            Math.random() * data[i]["tweets"].length
                        );
                        const tweet = data[i]["tweets"][tweetIndex];
                        // Remove
                        const x = [
                            ...data.slice(0, i),
                            {
                                account: data[i]["account"],
                                tweets: [
                                    ...data[i]["tweets"].slice(0, tweetIndex),
                                    ...data[i]["tweets"].slice(tweetIndex + 1),
                                ],
                            },
                            ...data.slice(i + 1),
                        ];
                        // Set game data (w/ removed tweet)
                        setGameData(x);
                        return tweet;
                    }
                }
            })
            .then((tweet) =>
                tweetLookup(tweet["id"]).then((res) => {
                    setInitialPost(res);
                    setLoading(true);
                })
            );
    }, []);

    if (loading === false) {
        return (
            <Box>
                <Flex justifyContent="center">
                    <CircularProgress isIndeterminate color="#00acee" />
                </Flex>
            </Box>
        );
    } else {
        return (
            <GameImproved
                accounts={accounts}
                colorToggle={colorToggle}
                setGameState={setGameState}
                gameData={gameData}
                setGameData={setGameData}
                initialResult={initialResult}
                initialChoices={initialChoices}
                initialPost={initialPost}
            />
        );
    }
};
