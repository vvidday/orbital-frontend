import { useEffect } from "react";
import { resetData } from "../data/bufferData";
import { Box } from "@chakra-ui/react";
import { UserInfo } from "./userInfo";
import { UserScores } from "./userScores";
import { UserScoresImproved } from "./userScoresImproved";
import { UserInfoImproved } from "./userInfoImproved";

export const Profile = ({ session, setGameState, setAccs }) => {
    // On load, reset game data - because players may access profile page while active game is running.
    useEffect(() => {
        resetData();
        // In rare case that someone accesses while not logged in, return to selection
        if (session === null) {
            setGameState(0);
        }
    }, []);

    return (
        <Box>
            <UserInfoImproved session={session} />
            <UserScoresImproved
                session={session}
                setGameState={setGameState}
                setAccs={setAccs}
            />
        </Box>
    );
};
