import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Flex,
    Input,
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
