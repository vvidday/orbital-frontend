import React, { useEffect } from "react";
import { useState } from "react";
import { setChoices } from "../logic/setChoices";
import { data } from "../data/sampleData";
import { buttonLogic } from "../logic/button";
import { resetColor } from "../logic/button";
import { setDefault, score } from "./score";
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Flex,
    useDisclosure,
    Fade,
} from "@chakra-ui/react";

import { ShowAnswer } from "./answer";
import { MainDisplay } from "./mainDisplay";

// Modified Game Component that uses hardcoded values instead of pulling from the API.
export const GameTest = (
    // Twitter accounts selected by the player is passed in as props (hardcode for now)
    { accounts, colorToggle }
) => {
    const [result, setResult] = useState({});
    const [choices, allChoices] = useState([]);
    const [reload, setReload] = useState();
    const [post, setPost] = useState("");

    const [ID, setID] = useState();
    const [disable, setDisable] = useState(true);
    const [reloadDisable, setReloadDisable] = useState(false);

    const [embed, setEmbed] = useState();
    const [reloadEmbed, setReloadEmbed] = useState(false);
    const [showAnswer, setShowAnswer] = useState();
    /*
            Game logic -> Depends how we can retrieve tweets. Tentatively:
                Each Round:
                    - Randomly select an account
                    - Randomly get a tweet from that account
                    - Display that tweet, and write some logic for the buttons 
                        - Correct = repeat from top (new round), score +1, store tweet somewhere so we don't dupe
                            - How to store? Tweet IDs in hash table? <- is this possible to get?
                        - Wrong = end round, reset state, go to highscores page (KIV)
        */

    /*
            Game logic(Status):
                WIP:
                    - Correct = store tweet somewhere so we don't dupe
                            - How to store? Tweet IDs in hash table? <- is this possible to get?
                    - Wrong = go to highscores page (KIV)
                DONE:
                    - Randomly select an account
                    - Randomly get a tweet from that account
                        - Only gets past 10 tweets without retweet or replies
                    - Display that tweet, and write some logic for the buttons 
                        - Correct = repeat from top (new round), score +1
                        - Wrong = end round, reset state,
        */
    /* 
            Comment out for full implementation.
            Testing code below
        */
    const index = 1;

    // Set score to 0 on component render (Just for toggling between modes)
    useEffect(() => {
        setDefault();
    }, []);

    useEffect(() => {
        async function userInfo() {
            try {
                /* 
                    Comment out for full implementation.
                    Testing code below
                */
                setResult({
                    id: "813286",
                    name: "Barack Obama",
                    username: "BarackObama",
                });
            } catch (error) {
                console.log(error);
            }
        }
        async function postInfo() {
            try {
                /* 
                    Comment out for full implementation.
                    Testing code below
                */
                const recentPosts = data;
                const randomRecentPost =
                    recentPosts.data[
                        Math.floor(Math.random() * recentPosts.data.length)
                    ];
                setPost(randomRecentPost.text);
                setID(randomRecentPost.id);
                setReloadEmbed(!reloadEmbed);
            } catch (error) {
                console.log(error);
            }
        }
        userInfo().then(postInfo());
        allChoices(setChoices(index, accounts));
        console.log(ID)
    }, [reload]);

    useEffect(() => {
        setDisable(!disable);
    }, [reloadDisable]);

    useEffect(() => {
        if (colorToggle == "dark") {
            setEmbed("dark");
        } else {
            setEmbed("light");
        }
        setReloadEmbed(!reloadEmbed);
    }, [colorToggle]);
    console.log(reloadDisable);

    // Chakra specific hook for fade transition.
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box>
            <Flex padding="10px" direction="column">
                <Center fontSize="20px">Score: {score}</Center>
                <MainDisplay 
                    reloadEmbed = {reloadEmbed} 
                    embed = {embed} 
                    post = {post} 
                    ID = {ID} showAnswer = {reloadDisable} 
                />
                <Center className="options" marginTop="15px">
                    <ButtonGroup
                        gap="4"
                        display={"flex"}
                        flexWrap={"wrap"}
                        justifyContent={"center"}
                    >
                        {
                            // Reformat once we determine how accounts are stored

                            choices.map((acc, key) => {
                                return (
                                    <Button
                                        variant="custom"
                                        className="option"
                                        key={key}
                                        isDisabled = {disable}
                                        onClick={(e) => {
                                            buttonLogic(result, e);
                                            onToggle();
                                            setReloadDisable(!reloadDisable);
                                        }}
                                    >
                                        {acc.name}
                                    </Button>
                                );
                            })
                        }
                    </ButtonGroup>
                </Center>
            </Flex>
            <Center className="answer">
                <Fade in={isOpen}>
                    <Button
                        className="answer"
                        colorScheme="twitter"
                        variant="solid"
                        onClick={() => {
                            //resetColor(userChoice);
                            resetColor();
                            onToggle();
                            setReloadDisable(!reloadDisable);
                            setReload(!reload);
                        }}
                    >Next
                    </Button>
                </Fade>
            </Center>
            <ShowAnswer answer={result.name} />
        </Box>
    );
};
