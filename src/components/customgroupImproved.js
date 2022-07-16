import {
    Box,
    Button,
    Center,
    FormControl,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack,
    FormErrorMessage,
    FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { getUserByUsername } from "../api/twitter";
<<<<<<< HEAD
import { isDuplicate, newGroup } from "../supabase/groupFunctions";
=======
import {
    isDuplicate,
    newGroup,
} from "../supabase/groupFunctions";
>>>>>>> 828e504b80ab97072b44cc0921116530ea6477ff
import { createForGroup } from "../supabase/statisticsGroupFunctions";
import { DropDown } from "./customgroupDropdown";

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
    const [handles, setHandles] = useState([
        { id: 0, value: "test" },
        { id: 1, value: "test1" },
        { id: 2, value: "test4" },
    ]);

    // State for current input
    const [inputValue, setInput] = useState("");

    // Error checking used by <Form></Form>
    const isError = error != "";

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

    const playCustomGroup = async (handles) => {
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
                newGroup(handles)
<<<<<<< HEAD
                    .then(() => createForGroup(handles))
                    .then(() => {
                        setGameState(1);
                    });
=======
                .then(() => createForGroup(handles))
                .then(() => {
                    setGameState(1);
                });
>>>>>>> 828e504b80ab97072b44cc0921116530ea6477ff
            }
            // Go next game state (start game)
            setGameState(1);
        }
    };

    // Checks the validity of a single account
    const checkAccount = async (handle) => {
        let filteredHandle = handle;

        //if (handles.map((element)=> element.value).includes(handle)) {
        //    setError(`Handle has already been added!`);
        //    setLoading(false);
        //    return null;
        //}

        if (handle.charAt(0) == "@" && handle.length == 1) {
            // checks for single "@" character
            setError(`Empty handle!`);
            setLoading(false);
            return null;
        } else if (handle.charAt(0) == "@") {
            // if account starts with "@", remove it
            filteredHandle = handle.substring(1);
        }
        // checks for more than 8 inputs
        if (handles.length == 8 && filteredHandle != "") {
            setError(`You have reached the maximum handles allowed!`);
            setLoading(false);
            return null;
        }
        if (filteredHandle != "") {
            const res = await getUserByUsername(filteredHandle);
            if (res.data.id == null) {
                setError(`${handle} is not a valid twitter username.`);
                setLoading(false);
                return null;
            }
            setError("");
            setAccounts([...accounts, res.data]);
            setInput("");
<<<<<<< HEAD
            setHandles([...handles, { id: handles.length, value: handle }]);
=======
            setHandles([...handles, {id:handles.length, value:filteredHandle}]);
>>>>>>> 828e504b80ab97072b44cc0921116530ea6477ff
            return true;
        }
        setError(`Empty input!`);
        setLoading(false);
        return null;
    };

    return (
        <VStack>
            {
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        checkAccount(inputValue);
                    }}
                    style={{
                        display: "flex",
                        width: "100vw",
                        marginTop: "30px",
                        justifyContent: "center",
                    }}
                >
                    <FormControl
                        isInvalid={isError}
                        w="100%"
                        size="md"
                        maxW={{
                            base: "80vw",
                            sm: "70vw",
                            lg: "50vw",
                            xl: "30vw",
                        }}
                    >
                        <FormLabel>
                            Input Twitter Handle/Username (Limited to 8):
                        </FormLabel>
                        <InputGroup>
                            <Input
                                pr="4.5rem"
                                placeholder="Input Handle/Username"
                                value={inputValue}
                                autoComplete="off"
                                onChange={(e) => {
                                    // updates user input and replace all spaces
                                    // Result: user CANNOT input spaces
                                    setInput(e.target.value.replace(/\s/g, ""));
                                }}
                            />
                            <InputRightElement width="5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() => {
                                        checkAccount(inputValue);
                                    }}
                                >
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
            <DropDown inputs={handles} setHandles={setHandles} />
            <Center>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <Button
                        id="play-btn"
                        onClick={(e) => {
                            setLoading(true);
<<<<<<< HEAD
                            const outputHandles = [];
                            handles.map((i) => {
                                // check and remove first char value if its "@"
                                if (i.value != "") {
                                    if (i.value.charAt(0) == "@") {
                                        outputHandles.push(
                                            i.value.substring(1)
                                        );
                                    } else {
                                        outputHandles.push(i.value);
                                    }
                                }
                            });
=======
                            const outputHandles = []
                            handles.map((handle) => {
                                outputHandles.push(handle.value)
                            })
>>>>>>> 828e504b80ab97072b44cc0921116530ea6477ff
                            console.log(outputHandles);
                            playCustomGroup(outputHandles, accounts);
                        }}
                    >
                        Play
                    </Button>
                )}
            </Center>
        </VStack>
    );
};
