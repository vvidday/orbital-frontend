import React, { useState, useEffect } from "react";
import {
    Box,
    Center,
    Text,
    SkeletonCircle, 
    SkeletonText,
} from "@chakra-ui/react";
import { 
    TwitterTweetEmbed
} from 'react-twitter-embed';
import extractUrls from "extract-urls";
// Modified Game Component that uses hardcoded values instead of pulling from the API.
export const MainDisplay = (
    // Twitter accounts selected by the player is passed in as props (hardcode for now)
    { reloadEmbed, embed, post, ID, showAnswer }
) => {
    const [links, setLinks] = useState([]);
    useEffect(() => {
        setLinks(extractUrls(post));
    }, []);

    console.log(extractUrls(post));
    return (
        <Box minHeight="250px">
            {!showAnswer ? (
                <Center display="flex">
                    <Box 
                        border='2px' 
                        borderColor='grey' 
                        borderRadius="10px"
                        minWidth="516px"
                    >
                        <Box display="flex" paddingLeft="16px" marginTop="5px">
                            <SkeletonCircle 
                                size='10'
                                startColor='blue.500' endColor='pink.500'
                                speed="1.5"
                            />
                            <Box paddingLeft="5px">
                                <SkeletonText
                                    mt='2' 
                                    noOfLines={2} 
                                    spacing='2'
                                    startColor='blue.500' endColor='pink.500'
                                    speed="1.5"
                                >
                                    This is an Easter Egg
                                </SkeletonText>
                            </Box>
                        </Box>
                        <Text 
                            className="tweet"
                            padding="12px 16px 4px 16px"
                            maxWidth="516px" maxHeight="255px"
                            minWidth="250px"
                        >
                            {post.replace(/^"(.*)"$/, "$1").replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')}
                        </Text>
                    </Box>
                    {links != undefined ? (
                        links.map((link) => {

                        })
                    ):(
                        <Box></Box>
                    )}
                </Center>
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
