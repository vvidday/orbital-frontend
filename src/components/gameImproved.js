import React, { useEffect } from "react";
import { useState } from "react";
import { setChoices } from "../logic/setChoices";
import { getUserByUsername, tweetLookup } from "../api/twitter";
import { getTimeline } from "../api/twitter";
import { buttonLogic } from "../logic/button";
import { resetColor } from "../logic/button";
import { score, setDefault } from "./score";
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Flex,
    useDisclosure,
    Fade,
} from "@chakra-ui/react";
import { data } from "../data/bufferData";
import { ShowAnswer } from "./answer";
import { MainDisplay } from "./mainDisplay";
import { MainDisplayImproved } from "./mainDisplayImproved";
export const GameImproved = (
    // Twitter accounts selected by the player is passed in as props (hardcode for now)
    { accounts, colorToggle, setGameState }
) => {
    /* States */
    // Result - Object containing the object data of the correct user. E.g. {id:"813286",name:"Barack Obama",username:"BarackObama"}
    const [result, setResult] = useState({});
    // Post - String, the ID content of the selected twitter post.
    const [post, setPost] = useState({ text: "", media: [] });
    // Choices - Array of objects. length 4. contains 4 user objects : the correct user (i.e. result) and 3 other random users from {accounts}.
    const [choices, allChoices] = useState([]);
    // Boolean - Placeholder variable to trigger useEffect() - used to reset round of the game
    const [reload, setReload] = useState(false);

    // wrong=true when player selects wrong answer, used to change next button.
    const [wrong, setWrong] = useState(false);

    //const [ID, setID] = useState();
    const [disable, setDisable] = useState(true);
    const [reloadDisable, setReloadDisable] = useState(false);

    const [embed, setEmbed] = useState();
    const [reloadEmbed, setReloadEmbed] = useState(false);

    // Used in maindisplay
    const [totalImg, setTotalImg] = useState(0);

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
                TODO:
                    - Some way to handle images
                    - Hide buttons temporarily after each round so people don't double click
        */

    // Set score to 0 on component render (Just for toggling between modes)
    useEffect(() => {
        setDefault();
    }, []);

    // Main game loop, called on render and each time reload is modified
    useEffect(() => {
        // Pick a random account from {accounts} array
        const index = Math.floor(Math.random() * accounts.length);
        const randomAccount = accounts[index].username;

        let tempResult = {};
        let tempPost = {};
        //let tempID = "";
        /* 
            userInfo - Asynchronously fetches the user data of the randomly selected account, and stores it in {result}
            @return Promise containing the user id of the randomly selected account
        */
        async function userInfo() {
            try {
                const response = await getUserByUsername(randomAccount);
                tempResult = response.data;
                return response.data.id;
            } catch (error) {
                console.log(error);
            }
        }
        /*
            postInfo - Asynchronously fetches the timeline of the given user id, chooses a random tweet from the timeline,
            stores it in {post}.
            @params id - user id 
            @return Implicitly wrapped promise
        */
        async function postInfo(id) {
            try {
                const response = await getTimeline(id, true, true);
                const recentPosts = response.data;
                const randomRecentPost =
                    recentPosts.data[
                        Math.floor(Math.random() * recentPosts.data.length)
                    ];
                // Get full tweet object including media for the post
                tempPost = await tweetLookup(randomRecentPost.id);
            } catch (error) {
                console.log(error);
            }
        }
        // After userInfo() and postInfo(), change {choices} to the array returned by setChoices.
        // Then appends to buffer data to maintain buffer size
        userInfo()
            .then((id) => postInfo(id))
            .then(() => {
                data.push({
                    account: tempResult,
                    post: tempPost,
                    //id: tempPost,
                    choices: setChoices(index, accounts),
                });
            });

        //Takes the top post from buffer array and sets the useState
        //should run asynchronously with the above part
        const topData = data.shift();
        console.log(topData);
        //setPost(allInfo(topData.id));
        //console.log(post);
        setResult(topData.account);
        setPost(topData.post);
        allChoices(topData.choices);
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

    // Chakra specific hook for fade transition.
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Box>
            <Flex padding="10px" direction="column">
                <Center fontSize="20px">Score: {score}</Center>
                {
                    <MainDisplayImproved
                        key={post}
                        reloadEmbed={reloadEmbed}
                        embed={embed}
                        post={post}
                        showAnswer={reloadDisable}
                        onToggle = {onToggle}
                    />
                }

                <Center className="options" marginTop="15px">
                    <ButtonGroup
                        gap="4"
                        display={"grid"}
                        gridTemplateColumns="auto auto"
                        flexWrap={"wrap"}
                        justifyContent={"center"}
                        isAttached
                    >
                        {
                            // Reformat once we determine how accounts are stored
                            choices.map((acc, key) => {
                                return (
                                    <Button
                                        id={`choice${key}`}
                                        variant="custom"
                                        className="option"
                                        key={key}
                                        isDisabled={disable}
                                        onClick={(e) => {
                                            const res = buttonLogic(
                                                result,
                                                e,
                                                accounts
                                            );

                                            // Wrong answer
                                            if (res === false) {
                                                setWrong(true);
                                                // Clean up
                                            }
                                            //onToggle();
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
                    {wrong ? (
                        <Button
                            id="wrong-btn"
                            className="answer"
                            colorScheme="twitter"
                            variant="solid"
                            onClick={() => {
                                resetColor();
                                onToggle();
                                setReloadDisable(!reloadDisable);
                                setReload(!reload);
                                setGameState(2);
                            }}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            id="next-btn"
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
                        >
                            Next
                        </Button>
                    )}
                </Fade>
            </Center>
            <ShowAnswer answer={result.name} />
        </Box>
    );
};
