import React from "react";
import { Box, Button, Center, useDisclosure, Fade } from "@chakra-ui/react";

// Modified Game Component that uses hardcoded values instead of pulling from the API.
export const ShowAnswer = (
    // Twitter accounts selected by the player is passed in as props (hardcode for now)
    { answer }
) => {
    // Chakra specific hook for fade transition.
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box>
            <Center marginTop={"50px"}>
                <Button id="showans-btn" onClick={onToggle}>
                    Show Answer (Dev)
                </Button>
            </Center>

            <Fade in={isOpen}>
                <Center id="answer" p="40px">
                    {answer}
                </Center>
            </Fade>
        </Box>
    );
};
