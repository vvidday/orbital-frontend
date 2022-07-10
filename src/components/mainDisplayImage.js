import React, { useEffect, useState } from "react";
import {
    Box,
    Image,
    Button,
    Flex,
    RadioGroup,
    Stack,
    Radio,
} from "@chakra-ui/react";

// Modified Game Component that uses hardcoded values instead of pulling from the API.
export const MainDisplayImage = (
    // Twitter accounts selected by the player is passed in as props (hardcode for now)
    { post}
) => {
    // Index of currently shown image
    const [img, setImg] = useState(0);
    // Total number of images in tweet
    const [totalImg, setTotalImg] = useState(0);

    useEffect(() => {
        // Set current index to 0 on new post
        setImg(0);
    }, [post]);

    return (
        <Box
            className="tweet"
            padding="12px 16px 4px 16px"
            maxWidth="516px"
            minWidth="250px"
        >
            {/*post.replace(/^"(.*)"$/, "$1")*/}
            <Box fontSize={{ base: '14px', sm: '16px', lg: '20px'}}>
                {post.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "")}
            </Box>
            

            {post.media.length > 0 ? (
                <Image 
                    w={{ base: '90vw', sm:"80vw", md: '512px'}}
                    src={post.media[img]}
                    borderRadius="lg"
                    ></Image>
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
    );
};
