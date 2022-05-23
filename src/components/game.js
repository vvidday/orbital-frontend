import React from 'react';

export const Game = (
    // Twitter accounts selected by the player is passed in as props (hardcode for now)
    {accounts}
    ) => {

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
    
    return (
        <div>
            <div className="tweet">Sample Tweet</div>
            <div className="options">
                { // Reformat once we determine how accounts are stored
                accounts.map((acc, key) => {
                    return <button className="option" key={key} onClick={(e)=>{}}>{acc.name}</button>
                })}
            </div>
        </div>
    )
}