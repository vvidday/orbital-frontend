import React, { useEffect } from 'react';
import { useState } from "react";
import { setChoices } from './setChoices';
import { getUserByUsername } from "../api/twitter";
import { getTimeline } from "../api/twitter";
import {data} from "./sampleData";


export const Game = (
    // Twitter accounts selected by the player is passed in as props (hardcode for now)
    {accounts}
    ) => {
        const [result, setResult] = useState({});
        const [post, setPost] = useState({});
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
                    - Display that tweet, and write some logic for the buttons 
                        - Correct = repeat from top (new round), score +1, store tweet somewhere so we don't dupe
                            - How to store? Tweet IDs in hash table? <- is this possible to get?
                        - Wrong = end round, reset state, go to highscores page (KIV)
                DONE:
                    - Randomly select an account
                    - Randomly get a tweet from that account
                        - Only gets past 10 tweets without retweet or replies
        */

        const index = Math.floor(Math.random() * accounts.length);
        const randomAccount = accounts[index].username;
        
        useEffect(() => {
            async function userInfo() {
                try {
                    /* 
                        Uncomment for full implementation.
                        Commented out to prevent reaching tweet api request limit
                    */
                    //const response = await getUserByUsername(randomAccount);
                    //setResult(response.data);

                    setResult({id:"813286",name:"Barack Obama",username:"BarackObama"});
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

                    const recentPosts = data;
                    const randomRecentPost = recentPosts.data[Math.floor(Math.random() * recentPosts.data.length)];
                    setPost(randomRecentPost.text);
                } catch (error) {
                    console.log(error);
                }
            }
            userInfo().then(postInfo());
        },[]);
    return (
        <div>
            <div className="tweet">Sample Tweet</div>
            <div className="tweet-data">{JSON.stringify(post).replace(/^"(.*)"$/, '$1')}</div>
            <div>{randomAccount.username}</div>
            <div className="options">
                { // Reformat once we determine how accounts are stored
                setChoices(index, result, accounts).map((acc, key) => {
                    return <button className="option" key={key} onClick={(e)=>{}}>{acc.username}</button>
                })};
            </div>
        </div>
    )
};