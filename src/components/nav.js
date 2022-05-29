import React from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Switch,
} from "@chakra-ui/react";

export const Nav = ({ testing, setTesting }) => {
    return (
        <Flex
            bg="#0c0c0fff"
            h="100px"
            color="#ffffffff"
            padding="10px 30px"
            align="center"
        >
            <Flex as="nav" id="navbar" basis="100%" justify="space-between">
                <Heading as="h2">
                    Who{" "}
                    <Text as="span" color="#00acee">
                        Tweeted
                    </Text>{" "}
                    That?
                </Heading>

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
            </Flex>
        </Flex>
    );
};
