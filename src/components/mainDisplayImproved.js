import React, { useEffect, useState } from "react";
import {
    Box,
    Center,
    Text,
    SkeletonCircle,
    SkeletonText,
    Image,
    Button,
    Flex,
    RadioGroup,
    Stack,
    Radio,
    VStack,
} from "@chakra-ui/react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { MainDisplayImage } from "./mainDisplayImage";

// Modified Game Component that uses hardcoded values instead of pulling from the API.
export const MainDisplayImproved = (
    // Twitter accounts selected by the player is passed in as props (hardcode for now)
    { reloadEmbed, embed, post, showAnswer, onToggle}
) => {
    // Index of currently shown image
    const [img, setImg] = useState(0);
    // Total number of images in tweet
    const [totalImg, setTotalImg] = useState(0);
    const [preLoad, setPreLoadEmbed] = useState(<Box></Box>);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Set current index to 0 on new post
        setImg(0);
    }, [post]);
/*
    useEffect(() => {
        setPreLoadEmbed(
        <TwitterTweetEmbed
            onLoad={function noRefCheck() {
                //onToggle();
                setLoaded(!loaded);
            }}
            placeholder="Loading"
            key={reloadEmbed}
            tweetId={post.id}
            options={{
                theme: embed,
                align: "center",
            }}
        />);
    }, [post]);
*/
    return (
        <Box minHeight="250px" border="1px">
            {!showAnswer ? (
                <Center>
                    <VStack
                        border="2px"
                        borderColor="grey"
                        borderRadius="lg"
                        w={{ base: '90vw', sm:"80vw", md: '512px'}}
                        overflow={"hidden"}
                    >
                        <Flex 
                            paddingLeft="16px" 
                            marginTop="8px" 
                            alignSelf="flex-start"
                        >
                            <SkeletonCircle
                                size="10"
                                startColor="blue.500"
                                endColor="pink.500"
                                speed="1.5"
                            />
                            <Box paddingLeft="5px">
                                <SkeletonText
                                    mt="2"
                                    noOfLines={2}
                                    spacing="2"
                                    startColor="blue.500"
                                    endColor="pink.500"
                                    speed="1.5"
                                >
                                    This is an Easter Egg
                                </SkeletonText>
                            </Box>
                        </Flex>
                        <MainDisplayImage post={post}/>
                    </VStack>
                </Center>
            ) : (
                <TwitterTweetEmbed
                    onLoad={function noRefCheck() {onToggle()}}
                    placeholder="Loading"
                    key={reloadEmbed}
                    tweetId={post.id}
                    options={{
                        theme: embed,
                        align: "center",
                    }}
                />
                
                //<Box>{preLoad}</Box>
            )}
        </Box>
    );
};
