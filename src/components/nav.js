import React from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Switch,
    Button,
    useColorMode,
} from "@chakra-ui/react";

import { signInWithTwitter, signOut } from "../logic/auth";

export const Nav = ({ session }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex h="100px" padding="10px 30px" align="center">
            <Flex as="nav" id="navbar" basis="100%" justify="space-between">
                <Heading as="h2">
                    Who{" "}
                    <Text as="span" color="#00acee">
                        Tweeted
                    </Text>{" "}
                    That?
                </Heading>
                <Box>
                    <Button id="toggle" onClick={toggleColorMode}>
                        Toggle Mode
                    </Button>
                </Box>
                <Box>
                    {session ? (
                        <Button onClick={signOut}>Sign Out</Button>
                    ) : (
                        <Button onClick={signInWithTwitter}>Sign In</Button>
                    )}
                </Box>
            </Flex>
        </Flex>
    );
};
