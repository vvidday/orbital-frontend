import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Flex,
    Input,
    Text,
    useClipboard,
} from "@chakra-ui/react";
import { useRef } from "react";

// Takes useDisclosure object as props (and gamelink)
export const GameCodePopup = ({ isOpen, onOpen, onClose, gameLink }) => {
    const cancelRef = useRef();
    // For copy
    const { hasCopied, onCopy } = useClipboard(gameLink);

    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={onClose}
            leastDestructiveRef={cancelRef}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>Game link generated!</AlertDialogHeader>
                    <Flex padding="20px">
                        <Input isReadOnly value={gameLink} ref={cancelRef} />
                        <Button onClick={onCopy} ml="10px">
                            {hasCopied ? "Copied" : "Copy"}
                        </Button>
                    </Flex>
                    <Text padding="20px">
                        Share the link with your friends to let them play a game
                        based on this group!
                    </Text>

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
    );
};
