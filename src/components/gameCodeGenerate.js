// Component that generates game code dynamically
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
    AlertDialog,
    useDisclosure,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogFooter,
    useClipboard,
    Flex,
    AlertDialogHeader,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { getUserByUsername } from "../api/twitter";
import {
    generateGroupID,
    isDuplicate,
    newGroup,
} from "../supabase/groupFunctions";
import { createForGroup } from "../supabase/statisticsGroupFunctions";
import { DropDown } from "./customgroupDropdown";

// Code taken from customgroupimproved, only modified action on submit.
export const GameCodeGenerate = ({ setGameState }) => {
    // State to keep track & display error message for users
    const [error, setError] = useState("");

    // State for loading, just to disable button while async calls are running.
    const [loading, setLoading] = useState(false);

    // State for all valid accounts added
    const [accounts, setAccounts] = useState([]);

    // State for all inputs
    const [handles, setHandles] = useState([]);

    // State for current input
    const [inputValue, setInput] = useState("");
    const inputRef = useRef(null);

    // State for game link to be generated for user
    const [gameLink, setGameLink] = useState("test");

    // For alert popup
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    // For copy
    const { hasCopied, onCopy } = useClipboard(gameLink);

    const BASE_URL = "https://orbital-frontend-orcin.vercel.app/";

    // Error checking used by <Form></Form>
    const isError = error != "";

    // Is called upon submission of the form.
    // Creates group if it doesn't exist (GROUP - newGroup, STATS - createForGroup)
    // Then, generates link for user.
    const generateGameCode = async (handles) => {
        if (handles.length < 2) {
            setLoading(false);
            setError("Please input at least two usernames.");
        } else {
            setError("");
            // Check if group already exists
            const groupExists = await isDuplicate(handles);

            if (!groupExists) {
                // Create group
                newGroup(handles)
                    .then(() => createForGroup(handles))
                    .then(() => {
                        // Present link to user
                        setGameLink(BASE_URL + generateGroupID(handles));
                        onOpen();
                    });
            } else {
                // Present link to user
                setGameLink(BASE_URL + generateGroupID(handles));
                onOpen();
            }
        }
    };
    // Handle reset of loading on close (in case user presses escape or clicks outside)
    useEffect(() => {
        setLoading(isOpen);
    }, [isOpen]);

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
            setHandles([
                ...handles,
                { id: handles.length, value: filteredHandle },
            ]);
            return true;
        }
        setError(`Empty input!`);
        setLoading(false);
        return null;
    };

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
                leastDestructiveRef={cancelRef}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            Game link generated!
                        </AlertDialogHeader>
                        <Flex padding="20px">
                            <Input
                                isReadOnly
                                value={gameLink}
                                ref={cancelRef}
                            />
                            <Button onClick={onCopy} ml="10px">
                                {hasCopied ? "Copied" : "Copy"}
                            </Button>
                        </Flex>

                        <AlertDialogFooter>
                            <Flex align="center">
                                <Button
                                    marginLeft="20px"
                                    onClick={() => {
                                        onClose();
                                    }}
                                >
                                    Close
                                </Button>
                            </Flex>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
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
                                    ref={inputRef}
                                    placeholder="Input Handle/Username"
                                    value={inputValue}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        // updates user input and replace all spaces
                                        // Result: user CANNOT input spaces
                                        setInput(
                                            e.target.value.replace(/\s/g, "")
                                        );
                                    }}
                                />
                                <InputRightElement width="5rem">
                                    <Button
                                        h="1.75rem"
                                        size="sm"
                                        onClick={() => {
                                            checkAccount(inputValue);
                                            inputRef.current.focus();
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
                                const outputHandles = [];
                                handles.map((handle) => {
                                    outputHandles.push(handle.value);
                                });
                                console.log(outputHandles);
                                generateGameCode(outputHandles);
                            }}
                        >
                            Generate Link
                        </Button>
                    )}
                </Center>
            </VStack>
        </>
    );
};
