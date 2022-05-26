import React, { useEffect } from "react";
import { useState } from "react";
import { setChoices } from "../logic/setChoices";
import { data } from "../logic/sampleData";
import { buttonLogic } from "../logic/button";
import { setDefault, score } from "./score";

// Modified Game Component that uses hardcoded values instead of pulling from the API.
export const GameTest = (
    // Twitter accounts selected by the player is passed in as props (hardcode for now)
    { accounts }
) => {
    const [result, setResult] = useState({});
    const [post, setPost] = useState({});
    const [choices, allChoices] = useState([]);
    const [reload, setReload] = useState();
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
            Uncomment for full implementation.
            Commented out to prevent reaching tweet api request limit
        */
    //const index = Math.floor(Math.random() * accounts.length);
    //const randomAccount = accounts[index].username;

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
                        Uncomment for full implementation.
                        Commented out to prevent reaching tweet api request limit
                    */
                //const response = await getUserByUsername(randomAccount);
                //setResult(response.data);

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
                        Uncomment for full implementation.
                        Commented out to prevent reaching tweet api request limit
                    */
                //const response = await getTimeline(result.id, true, true);
                //const recentPosts = response.data;
                //console.log(recentPosts);
                //const randomRecentPost = recentPosts.data[Math.floor(Math.random() * recentPosts.data.length)];
                //setPost(randomRecentPost.text);

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
            } catch (error) {
                console.log(error);
            }
        }
        userInfo().then(postInfo());
        allChoices(setChoices(index, accounts));
    }, [reload]);
    return (
        <div>
            <div>Score: {score}</div>
            {
                // Code for testing purpose
                <div> Answer: {result.name}</div>
            }
            <div className="tweet">
                {JSON.stringify(post).replace(/^"(.*)"$/, "$1")}
            </div>
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
