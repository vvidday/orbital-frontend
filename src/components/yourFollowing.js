import { 
    Box,
    Text, 
    Button, 
    Spinner,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Portal,
} from "@chakra-ui/react";
import { QuestionIcon } from '@chakra-ui/icons'
import { getFollowingSaved } from "../supabase/yourFollowingFunctions";
import { supabase } from "../supabase/supabaseClient";
import { useEffect, useState } from "react";
import { isDuplicate, newGroup } from "../supabase/groupFunctions";
import { createForGroup } from "../supabase/statisticsGroupFunctions";
import { handlesToAccs } from "../logic/helpers";

export const YourFollowing = ({ setGameState, accs, setAccs, session, following, setLoading }) => {
    useEffect(() => {
        if (session != null && supabase.auth.user() != null) {
            // gets user id if logged in
            const fetchData = async () => {
                const res = await getFollowingSaved(session);
                const userFollowing = res[0].followings
                console.log(res)
                if (userFollowing.length > 8) {
                    const newAccs = [];
                    let i = 0;
                    while (i < 8) {
                        const random = Math.floor(Math.random() * userFollowing.length);
                        newAccs.push(userFollowing[random]);
                        userFollowing.splice(random, 1);
                        i+=1;
                    }
                    console.log(newAccs);
                    setAccs(newAccs);
                } else {
                    setAccs(userFollowing);
                }
            }
            if (following) {
                fetchData().catch(console.error);
            }
        }
    }, [following]);

    return (
        <Box visibility={() => {if (session == null) {return "hidden"}return "show";}}>
            {following ? (
                <Button
                    border = "1px"
                    borderRadius = "10px"
                    flexDirection="column"
                    height="100%"
                    width={{base: "60vw", sm:"auto"}}
                    minWidth = "50px"
                    justifyContent="space-between"
                    padding="10px"
                    margin="10px"
                    _hover={{ cursor: "pointer", background:"whiteAlpha.300"}}
                    aria-label="YourFollowing"
                    onClick={async (e) => {
                        setLoading(true);
                        if (accs != []) {
                            const newAccs = await handlesToAccs(accs);
                            // creates stats for group upon clicking the button
                            const groupExists = await isDuplicate(accs);
                            if (!groupExists) {
                                newGroup(accs)
                                .then(() => createForGroup(accs));
                            }
                            setAccs(newAccs);
                        }
                        setGameState(1);
                    }}
                >
                    <Text>Your Following</Text>
                </Button>
            ) : (
                <Box margin="10px" position="relative" paddingRight="1.1em">
                    <Button
                        border = "1px"
                        borderRadius = "10px"
                        flexDirection="column"
                        height="100%"
                        width={{base: "60vw", sm:"auto"}}
                        minWidth = "50px"
                        justifyContent="space-between"
                        padding="10px"
                        aria-label="YourFollowing"
                        isLoading
                    >
                        <Spinner size="m"/>
                    </Button>
                    <Popover trigger="hover">
                        <PopoverTrigger>
                            <QuestionIcon aria-label="YFHelp" position="absolute" top="0px" right="0px"/>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                                <PopoverHeader pt={4} fontWeight='bold' border='0'>
                                    What's with the Loading time?
                                </PopoverHeader>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverBody>
                                    We apologise for the waiting time. 
                                    Unfortunately we are limited by Twitter's rate limit.
                                    Please refresh the page after a couple of minutes.
                                </PopoverBody>
                                <PopoverBody>
                                    In the mean time, you can check out the other categories!
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </Box>
            )
        }
        
        </Box>
    );
};
