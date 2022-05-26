import React, { useEffect } from "react";
import { useState } from "react";
import { setChoices } from "../logic/setChoices";
import { getUserByUsername } from "../api/twitter";
import { getTimeline } from "../api/twitter";
import { buttonLogic } from "../logic/button";
import { score, setDefault } from "./score";

export const Game = (
    // Twitter accounts selected by the player is passed in as props (hardcode for now)
    { accounts }
) => {
    /* States */
    // Result - Object containing the object data of the correct user. E.g. {id:"813286",name:"Barack Obama",username:"BarackObama"}
    const [result, setResult] = useState({});
    // Post - String, the text content of the selected twitter post.
    const [post, setPost] = useState("");
    // Choices - Array of objects. length 4. contains 4 user objects : the correct user (i.e. result) and 3 other random users from {accounts}.
    const [choices, allChoices] = useState([]);
    // Boolean - Placeholder variable to trigger useEffect() - used to reset round of the game
    const [reload, setReload] = useState(false);

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

    useEffect(() => {
        setDefault();
    }, []);

    // Main game loop, called on render and each time reload is modified
    useEffect(() => {
        // Pick a random account from {accounts} array
        const index = Math.floor(Math.random() * accounts.length);
        const randomAccount = accounts[index].username;
        /* 
                userInfo - Asynchronously fetches the user data of the randomly selected account, and stores it in {result}
                @return Promise containing the user id of the randomly selected account
            */
        async function userInfo() {
            try {
                const response = await getUserByUsername(randomAccount);
                setResult(response.data);
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
                setPost(randomRecentPost.text);
            } catch (error) {
                console.log(error);
            }
        }
        // After userInfo() and postInfo(), change {choices} to the array returned by setChoices.
        userInfo()
            .then((id) => postInfo(id))
            .then(() => allChoices(setChoices(index, accounts)));
    }, [reload]);
    return (
        <div>
            <div>{JSON.stringify(result)}</div>
            <div>Score: {score}</div>
            {
                // Code for testing purpose
                <div> Answer: {result.name}</div>
            }
            <div className="tweet">{post}</div>
            <div className="options">
                {
                    // Reformat once we determine how accounts are stored
                    choices.map((acc, key) => {
                        return (
                            <button
                                className="option"
                                key={key}
                                onClick={(e) => {
                                    setReload(!reload);
                                    buttonLogic(result, e, accounts);
                                }}
                            >
                                {acc.name}
                            </button>
                        );
                    })
                }
            </div>
        </div>
    );
};
