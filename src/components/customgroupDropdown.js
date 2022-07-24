import { DeleteIcon } from "@chakra-ui/icons";
import {
    HStack,
    StackDivider,
    Text,
    VStack,
    IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const DropDown = ({ inputs, setHandles }) => {
    return (
        <VStack
            divider={<StackDivider />}
            borderWidth="2px"
            borderColor="gray.600"
            borderRadius="lg"
            p="4"
            maxW={{ base: "80vw", sm: "70vw", lg: "50vw", xl: "30vw" }}
            w="100%"
            alignItems="stretch"
            boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            bgColor="rgba(255,255,255, 0.09)"
        >
            {inputs.map((handles) => {
                return (
                    <HStack key={handles.id}>
                        <Text w="100%" p="4px">
                            {handles.value}
                        </Text>
                        <IconButton
                            icon={<DeleteIcon boxSize="5" color="red.500" />}
                            isRound="true"
                            onClick={() => {
                                //console.log(inputs)
                                //console.log(handles)
                                inputs.splice(handles.id, 1);
                                for (let i = 0; i < inputs.length; i++) {
                                    inputs[i].id = i;
                                }
                                //console.log(inputs)
                                setHandles([...inputs]);
                            }}
                            mr="2"
                        />
                    </HStack>
                );
            })}
        </VStack>
    );
};
