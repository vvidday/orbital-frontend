import {
    Box,
    Flex,
    Image,
    Heading,
    Text,
    Link,
    Avatar,
} from "@chakra-ui/react";

export const UserInfo = ({ session }) => {
    return (
        <Box>
            <Flex align="center" margin="20px">
                <Avatar
                    name={session["user"]["user_metadata"]["full_name"]}
                    src={session["user"]["user_metadata"]["avatar_url"].replace(
                        "_normal",
                        ""
                    )}
                    margin="0px 20px"
                    size={{ base: "xl", sm: "xl", md: "2xl" }}
                />

                <Flex direction="column">
                    <Link
                        isExternal={true}
                        href={`https://www.twitter.com/${session["user"]["user_metadata"]["user_name"]}`}
                    >
                        <Heading size={{ base: "lg", sm: "xl" }}>
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
