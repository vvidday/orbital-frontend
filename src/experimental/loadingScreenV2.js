import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { GameImproved } from "./gameImproved";

import bufferData from "../logic/buffer";
import { GameImprovedV2 } from "./gameImprovedV2";
import { data } from "../data/improvedBuffer";
import bufferDataV2 from "../logic/improvedBuffer";

export const Loading = ({ accounts, colorToggle, setGameState}) => {
    const [reload, setReload] = useState();
    const [length, setLength] = useState(0);
    const BUFFER_SIZE = 5;

    useEffect(() => {
        if (accounts.length != 0) {
            bufferDataV2(accounts, BUFFER_SIZE);
        }
    }, [accounts]);

    useEffect(() => {
        setLength(data.length);
    }, [reload]);

    /* 
            if length of buffer is 0:
                Waits 1 second then reload the loading component
            otherwise:
                Loads the game-improved component
        
        */
    if (length == 0) {
        return (
            <Box>
                <Text margin="30px 30px">
                    {JSON.stringify(
                        setTimeout(() => {
                            setReload(!reload);
                        }, 1000)
                    ).replace(new RegExp(".*"), "Loading...")}
                </Text>
            </Box>
        );
    } else {
        return (
            <GameImprovedV2
                accounts={accounts}
                colorToggle={colorToggle}
                setGameState={setGameState}
            />
        );
    }
};
