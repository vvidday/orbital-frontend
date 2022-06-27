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
} from "@chakra-ui/react";
import { TwitterTweetEmbed } from "react-twitter-embed";

// Modified Game Component that uses hardcoded values instead of pulling from the API.
export const MainDisplay = (
    // Twitter accounts selected by the player is passed in as props (hardcode for now)
    { reloadEmbed, embed, post, showAnswer }
) => {
    // Index of currently shown image
    const [img, setImg] = useState(0);
    // Total number of images in tweet
    const [totalImg, setTotalImg] = useState(0);

    let buttonComp;

    useEffect(() => {
        // Set current index to 0 on new post
        setImg(0);
    }, [post]);

    return (
        <Box minHeight="250px">
            {!showAnswer ? (
                <Center display="flex">
                    <Box
                        border="2px"
                        borderColor="grey"
                        borderRadius="10px"
                        minWidth="516px"
                        overflow={"hidden"}
                    >
                        <Box display="flex" paddingLeft="16px" marginTop="5px">
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
                        </Box>
                        <Box
                            className="tweet"
                            padding="12px 16px 4px 16px"
                            maxWidth="516px"
                            minWidth="250px"
                        >
                            {/*post.replace(/^"(.*)"$/, "$1")*/}
                            {post.text}

                            {post.media.length > 0 ? (
                                <Image src={post.media[img]}></Image>
                            ) : (
                                <></>
                            )}

                            {post.media.length > 0 ? (
                                <Flex justify="space-between" align="center">
                                    <Button
                                        onClick={() => {
                                            if (img > 0) setImg(img - 1);
                                        }}
                                        cursor={
                                            img === 0
                                                ? "not-allowed"
                                                : "pointer"
                                        }
                                        id="left-img-btn"
                                    >
                                        {" "}
                                        &lt;{" "}
                                    </Button>
                                    <Box>
                                        <RadioGroup value={img}>
                                            <Stack direction="row">
                                                {post.media.map((x, key) => {
                                                    return (
                                                        <Radio
                                                            cursor="not-allowed"
                                                            value={key}
                                                        ></Radio>
                                                    );
                                                })}
                                            </Stack>
                                        </RadioGroup>
                                    </Box>
                                    <Button
                                        onClick={() => {
                                            if (img < post.media.length - 1)
                                                setImg(img + 1);
                                        }}
                                        cursor={
                                            img === post.media.length - 1
                                                ? "not-allowed"
                                                : "pointer"
                                        }
                                        id="right-img-btn"
                                    >
                                        {" "}
                                        &gt;{" "}
                                    </Button>
                                </Flex>
                            ) : (
                                <></>
                            )}
                        </Box>
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
                    onLoad={function noRefCheck() {}}
                    placeholder="Loading"
                    key={reloadEmbed}
                    tweetId={post.id}
                    options={{
                        theme: embed,
                        align: "center",
                    }}
                />
            )}
        </Box>
    );
};
