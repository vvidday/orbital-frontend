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
import { contrast } from "@chakra-ui/theme-tools";

export const Nav = ({ setToggle, session, setGameState }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    useEffect(() => {
        setToggle(colorMode);
    }, [colorMode]);

    return (
        <Flex 
            h="70px" 
            padding="10px 30px 10px 30px" 
            align="center" 
            bgColor={() => {
                if (colorMode == "dark") {
                    return "rgba(255, 255, 255, 0.1)"
                }
                return "rgba(255, 255, 255, 0.2)"
            }}
            boxShadow = "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
        >
            <Flex as="nav" id="navbar" basis="100%" justify="space-between">
                <Heading
                    as="h2"
                    cursor="pointer"
                    fontSize={{base: "7vw", sm: "4.5vw", md: "30px"}}
                    onClick={() => setGameState(0)}
                >
                    Who{" "}
                    <Text 
                        as="span" 
                        color="#00acee"
                    >
                        Tweeted
                    </Text>{" "}
                    That?
                </Heading>
                <Flex alignItems="center">
                    <Hide below="sm">
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
                            aria-label="ToggleMode"
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
                                aria-label="ToggleMode"
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
                                        <MenuItem
                                            onClick={() => setGameState(-1)}
                                            marginRight="20px"
                                        >
                                            Profile
                                        </MenuItem>
                                    ) : (
                                        <></>
                                    )}
                                </Box>
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
