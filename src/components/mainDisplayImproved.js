import React, { useEffect, useState } from "react";
import {
    Box,
    Center,
    SkeletonCircle,
    SkeletonText,
    Flex,
    Container,
    VStack,
    CircularProgress,
} from "@chakra-ui/react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { MainDisplayImage } from "./mainDisplayImage";

// Modified Game Component that uses hardcoded values instead of pulling from the API.
export const MainDisplayImproved = (
    // Twitter accounts selected by the player is passed in as props (hardcode for now)
    { reloadEmbed, embed, post, showAnswer, showNextButton, setShowNextButton }
) => {
    const [preLoad, setPreLoadEmbed] = useState(<Box></Box>);
    const [loaded, setLoaded] = useState(false);

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
        <Box minHeight="250px">
            {!showAnswer ? (
                <Center>
                    <VStack
                        borderRadius="lg"
                        w={{ base: "90vw", sm: "80vw", md: "512px" }}
                        overflow={"hidden"}
                        backdropFilter="auto"
                        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                        bgColor="rgba(255,255,255, 0.1)"
                    >
                        <Flex
                            paddingLeft="16px"
                            marginTop="15px"
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
                        <MainDisplayImage post={post} />
                    </VStack>
                </Center>
            ) : (
                <TwitterTweetEmbed
                    key={reloadEmbed}
                    onLoad={function noRefCheck() {
                        if (showNextButton === false) {
                            setShowNextButton(true);
                        }
                    }}
                    placeholder={
                        <Center>
                            <CircularProgress isIndeterminate color="#00acee" />
                        </Center>
                    }
                    //key={reloadEmbed}
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
