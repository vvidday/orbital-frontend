import React from "react";
import {
    Box,
    Center,
    Text,
    Skeleton, 
    SkeletonCircle, 
    SkeletonText,
    Stack
} from "@chakra-ui/react";
import { 
    TwitterTweetEmbed
} from 'react-twitter-embed';

// Modified Game Component that uses hardcoded values instead of pulling from the API.
export const MainDisplay = (
    // Twitter accounts selected by the player is passed in as props (hardcode for now)
    { reloadEmbed, embed, post, ID, showAnswer }
) => {
    return (
        <Box>
            {!showAnswer ? (
                <Center display={"flex"}>
                    <Box 
                        border='2px'
                        borderColor='grey'
                        borderRadius="10px"
                        display={"flex"}
                        flexDirection="column"
                    >
                        <Box 
                            display={"flex"}
                            paddingLeft="16px"
                            marginTop="5px"
                        >
                            <SkeletonCircle 
                                size='10'
                                startColor='blue.500' 
                                endColor='pink.500'
                            />
                            <Box paddingLeft="5px">
                                <SkeletonText
                                    mt='2' 
                                    noOfLines={2} 
                                    spacing='2'
                                    startColor='blue.500' 
                                    endColor='pink.500'>
                                    This is an Easter Egg
                                </SkeletonText>
                            </Box>
                        </Box>
                        <Text 
                            className="tweet"
                            padding="12px 16px 4px 16px"
                            maxWidth="516px"
                            maxHeight="255px"
                            minWidth="250px"
                        >
                            {post.replace(/^"(.*)"$/, "$1")}
                        </Text>
                    </Box>
                    
                </Center>
            ) : (
                <TwitterTweetEmbed 
                    
                    key = {reloadEmbed} 
                    tweetId = {ID}
                    options= {
                        {
                            theme:{embed},
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
