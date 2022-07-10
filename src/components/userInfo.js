import { Box, Flex, Image, Heading, Text, Link } from "@chakra-ui/react";

export const UserInfo = ({ session }) => {
    return (
        <Box>
            <Flex align="center" margin="20px">
                <Image
                    margin="0px 20px"
                    borderRadius={"50px"}
                    width="100px"
                    height="100px"
                    src={session["user"]["user_metadata"]["avatar_url"].replace(
                        "_normal",
                        ""
                    )}
                ></Image>
                <Flex direction="column">
                    <Link
                        isExternal={true}
                        href={`https://www.twitter.com/${session["user"]["user_metadata"]["user_name"]}`}
                    >
                        <Heading>
                            {session["user"]["user_metadata"]["full_name"]}
                        </Heading>
                    </Link>

                    <Text>
                        @{session["user"]["user_metadata"]["user_name"]}
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};
