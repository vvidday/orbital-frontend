import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: (props) => ({
            body: {
                backgroundColor: mode("white", "#212224ff")(props),
                color: mode("black", "white")(props),
                colorScheme: "transparent",
            },
        }),
    },
    config: {
        initialColorMode: "system",
        useSystemColorMode: true,
    },
    components: {
        Button: {
            variants: {
                custom: {
                    color: { light: "black", dark: "white" },
                    outlineColor: "#00acee",
                },
            },
        },
    },
});
//#212224ff