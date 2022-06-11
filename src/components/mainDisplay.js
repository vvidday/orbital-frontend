import React, { useEffect } from "react";
import { useState } from "react";
import {
    Box,
    Text
} from "@chakra-ui/react";

import { 
    TwitterTweetEmbed
} from 'react-twitter-embed';


// Modified Game Component that uses hardcoded values instead of pulling from the API.
export const MainDisplay = (
    // Twitter accounts selected by the player is passed in as props (hardcode for now)
    { reloadEmbed, embed, post, ID, showAnswer }
) => {
    //const [reload, setReload] = useState();

    //useEffect(() => {
    //    if (!showAnswer) {

    //    } else {

    //    }
    //}, [showAnswer]);

    return (
        <Box>
            {!showAnswer ? (
                <Text className="tweet" margin="30px 30px">
                    {JSON.stringify(post).replace(/^"(.*)"$/, "$1")}
                </Text>
            ) : (
                <TwitterTweetEmbed 
                    key = {reloadEmbed} 
                    tweetId = {ID}
                    options= {
                        {
                            theme:embed,
                            align:"center",
                            conversation: "none",
                            cards:"hidden"
                        }
                    }
                />
            )}
        </Box>
    );
};
