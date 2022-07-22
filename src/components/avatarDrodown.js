import { 
    Box,
    Avatar,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { signOut } from "../logic/auth";

export const AvatarDropdown = ({ session, setGameState }) => {
    return (
        <Box>
            <Menu>
                <MenuButton
                    as={IconButton}
                    borderRadius="3xl"
                    aria-label="ToggleMode"
                    icon={
                        <Avatar 
                            name={session["user"]["user_metadata"]["full_name"]} 
                            src = {session["user"]["user_metadata"]["avatar_url"].replace(
                                    "_normal",
                                    ""
                                )}
                            size="sm"
                        />
                    }
                    variant="outline"
                />
                <MenuList>
                    <MenuItem
                        onClick={() => setGameState(-1)}
                        marginRight="20px"
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            signOut();
                            window.location.reload(false);
                        }}
                    >
                        Sign Out
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
};
