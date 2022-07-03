import React, { useEffect } from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    useColorMode,
} from "@chakra-ui/react";

import { signInWithTwitter, signOut } from "../logic/auth";

export const Nav = ({ setToggle, session, setGameState }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    useEffect(() => {
        setToggle(colorMode);
    }, [colorMode]);

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
                <Flex>
                    <Box>
                        {session ? (
                            <Button
                                onClick={() => setGameState(-1)}
                                marginRight="20px"
                            >
                                Profile
                            </Button>
                        ) : (
                            <></>
                        )}
                    </Box>

                    <Button
                        marginRight={"20px"}
                        id="toggle"
                        onClick={() => {
                            toggleColorMode();
                            setToggle(colorMode);
                        }}
                    >
                        Toggle Mode
                    </Button>
                    <Box>
                        {session ? (
                            <Button
                                onClick={() => {
                                    signOut();
                                    window.location.reload(false);
                                }}
                            >
                                Sign Out
                            </Button>
                        ) : (
                            <Button onClick={signInWithTwitter}>Sign In</Button>
                        )}
                    </Box>
                </Flex>
                {/*
                    <Box>
                        <FormControl>
                            <FormLabel htmlFor="testing">
                                Testing Mode (ON = dummy data, OFF = query API){" "}
                            </FormLabel>
                            <Switch
                                type="checkbox"
                                id="testing"
                                defaultChecked
                                value={testing}
                                onChange={() => {
                                    setTesting(!testing);
                                }}
                            ></Switch>
                        </FormControl>
                    </Box>
                    */}
            </Flex>
        </Flex>
    );
};
