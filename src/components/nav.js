import React, { useEffect } from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    useColorMode,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    Show,
    Hide,
    Tooltip
} from "@chakra-ui/react";
import { 
    MoonIcon, 
    SunIcon, 
    HamburgerIcon, 
} from '@chakra-ui/icons'
import { signInWithTwitter, signOut } from "../logic/auth";

export const Nav = ({ setToggle, session }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    useEffect(() => {
        setToggle(colorMode);
    }, [colorMode]);

    return (
        <Flex h="100px" padding="10px 30px" align="center">
            <Flex as="nav" id="navbar" basis="100%" justify="space-between">
                <Heading as="h2" fontSize={{base: "7vw", sm: "4.5vw", md: "30px"}}>
                    Who{" "}
                    <Text as="span" color="#00acee">
                        Tweeted
                    </Text>{" "}
                    That?
                </Heading>
                <Flex alignItems="center">
                    <Hide below="sm">
                        <Button
                            marginRight={"20px"}
                            id="toggle"
                            onClick={() => {
                                toggleColorMode();
                                setToggle(colorMode);
                            }}
                        >{colorMode == "dark" ? 
                            (<SunIcon/>):(<MoonIcon/>)}
                        </Button>
                        <Box>
                            {session ? (
                                <Button onClick={() => {
                                    signOut();
                                    window.location.reload(false);
                                }}>Sign Out</Button>
                            ) : (
                                <Button onClick={signInWithTwitter}>Sign In</Button>
                            )}
                        </Box>
                    </Hide>
                    <Show below="sm">
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<HamburgerIcon />}
                                variant='outline'
                            />
                            <MenuList>
                                <MenuItem 
                                    onClick={() => {
                                        toggleColorMode();
                                        setToggle(colorMode);
                                    }}
                                >
                                        Toggle
                                </MenuItem>
                                <Box>
                                    {session ? (
                                        <MenuItem onClick={() => {
                                            signOut();
                                            window.location.reload(false);
                                        }}>Sign Out</MenuItem>
                                    ) : (
                                        <MenuItem onClick={signInWithTwitter}>Sign In</MenuItem>
                                    )}
                                </Box>
                            </MenuList>
                        </Menu>
                    </Show>
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
