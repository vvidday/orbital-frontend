import { Heading, Text, Button, WrapItem, Box} from "@chakra-ui/react";
import { handlesToAccs } from "../logic/helpers";

export const Group = ({
    title,
    handles,
    setAccs,
    setGameState,
    setLoading,
}) => {
    return (
        <WrapItem>
            <Button
                border = "1px"
                borderRadius = "10px"
                flexDirection="column"
                height="100%"
                width={{base: "60vw", sm:"auto"}}
                minWidth = "50px"
                justifyContent="space-between"
                padding="10px"
                _hover={{ cursor: "pointer", background:"lightblue"}}
                onClick={async (e) => {
                    setLoading(true);
                    if (handles != []) {
                        const accs = await handlesToAccs(handles);
                        setAccs(accs);
                    }
                    setGameState(1);
                }}
            >
                <Heading 
                    paddingBottom="10px"
                    size={{base:"md", sm:"xl"}}
                >{title}</Heading>
                {handles.map((handle, i) => {
                    return ( i < 5 ?
                        <Text key={i} fontStyle="italic">
                            @{handle}
                        </Text> : ( i == handles.length - 1 ?
                        <Text key={i} fontStyle="italic">
                            {"... +" + (handles.length - 5)}
                        </Text> :
                        <Text key={i}></Text>
                        )                                
                    );
                })}
            </Button>
        </WrapItem>
    );
};
