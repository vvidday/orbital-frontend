import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import { handlesToAccs } from "../logic/helpers";

export const Group = ({
    title,
    handles,
    setAccs,
    setGameState,
    setLoading,
}) => {
    return (
        <Box
            margin="30px 30px"
            padding="10px"
            _hover={{ cursor: "pointer" }}
            onClick={async (e) => {
                setLoading(true);
                const accs = await handlesToAccs(handles);
                setAccs(accs);
                setGameState(1);
            }}
        >
            <Heading paddingBottom="10px">{title}</Heading>
            {handles.map((handle, i) => {
                return (
                    <Text key={i} fontStyle="italic">
                        @{handle}
                    </Text>
                );
            })}
        </Box>
    );
};
