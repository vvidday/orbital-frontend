import { Box, 
    Button, 
    Center, 
    FormControl, 
    Input, 
    InputGroup, 
    InputRightElement, 
    Text, 
    VStack,
    FormErrorMessage,
    FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import { getUserByUsername } from "../api/twitter";
import {
    isDuplicate,
    newGroup,
} from "../supabase/groupFunctions";
import { DropDown } from "./customgroupDropdown";
import { Loading } from "./loadingScreen";

export const CustomGroupImproved = ({ setGameState, setAccs }) => {
    // States of the eight input fields.
    const [one, setOne] = useState("");
    const [two, setTwo] = useState("");
    const [three, setThree] = useState("");
    const [four, setFour] = useState("");
    const [five, setFive] = useState("");
    const [six, setSix] = useState("");
    const [seven, setSeven] = useState("");
    const [eight, setEight] = useState("");

    // State to keep track & display error message for users
    const [error, setError] = useState("");

    // State for loading, just to disable button while async calls are running.
    const [loading, setLoading] = useState(false);

    // State for all valid accounts added
    const [accounts, setAccounts] = useState([]);

    // State for all inputs
    const [handles, setHandles] = useState([{id:0, value:"test"},{id:1, value:"test1"},{id:2, value:"test4"}]);
    
    // State for current input
    const [inputValue, setInput] = useState("");

    // Error checking used by <Form></Form>
    const isError = error != ""

    const arr = [
        [one, setOne],
        [two, setTwo],
        [three, setThree],
        [four, setFour],
        [five, setFive],
        [six, setSix],
        [seven, setSeven],
        [eight, setEight],
    ];

    const playCustomGroup = async (handles, accounts) => {
        if (handles.length < 2) {
            setLoading(false);
            setError("Please input at least two usernames.");
        } else {
            setError("");
            // Set accounts
            setAccs(accounts);
            // Check if group already exists
            const groupExists = await isDuplicate(handles);

            if (!groupExists) {
                // Create group
                newGroup(handles).then(() => {
                    setGameState(1);
                });
            }
            // Go next game state (start game)
            setGameState(1);
        }
    };

    // Checks the validity of a single account
    const checkAccount = async (handle) => {
        if (handle != "") {
            let filteredHandle = handle
            // if account starts with "@", remove it
            if (handle.charAt(0) == "@") {
                filteredHandle = handle.substring(1);
            }
            const res = await getUserByUsername(filteredHandle);
            if (res.data.id == null) {
                setError(`${handle} is not a valid twitter username.`);
                setLoading(false);
                return null;
            }
            setError("");
            setAccounts([...accounts, res.data])
            setHandles([...handles, {id:handles.length + 1, value:inputValue}]);
            return true;
        } 
        return null
        
    }

    
    return (
        <VStack border="1px">{
            <form onSubmit={(e)=>{
                e.preventDefault();
                checkAccount(inputValue);
                }}
                style={{
                    display:"flex",
                    width:"100vw",
                    marginTop:"30px",
                    justifyContent:"center"
                }}
            >  
                <FormControl 
                    isInvalid={isError} 
                    w="100%"
                    size="md"
                    maxW={{ base: '80vw', sm: '70vw', lg: '50vw', xl: '30vw' }}>
                    <FormLabel>Input Twitter Handle/Username:</FormLabel>
                    <InputGroup>
                        <Input
                            pr="4.5rem"
                            placeholder="Input Handle/Username"
                            onChange={(e)=>{setInput(e.target.value)}}
                        />
                        <InputRightElement width="5rem">
                            <Button 
                                h='1.75rem' 
                                size='sm' 
                                onClick={()=>{
                                    checkAccount(inputValue);
                                }}>
                                    Next
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {!isError ? (
                        <Box></Box>
                    ) : (
                        <FormErrorMessage>{error}</FormErrorMessage>
                    )}
                </FormControl>
            </form>
            }
            <DropDown inputs={handles} setHandles={setHandles}/>
            <Center>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <Button
                        id="play-btn"
                        onClick={(e) => {
                            setLoading(true);
                            const outputHandles = [];
                            handles.map((i) => {
                                // check and remove first char value if its "@"
                                if (i.value != "") {
                                    if (i.value.charAt(0) == "@") {
                                        outputHandles.push(i.value.substring(1));
                                    } else {
                                        outputHandles.push(i.value);
                                    }
                                } 
                            });
                            console.log(outputHandles);
                            playCustomGroup(outputHandles);
                        }}
                    >
                        Play
                    </Button>
                )}
            </Center>        
        </VStack>
    )
};