import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: (props) => ({
            body: {
                bg: mode("white", "#212224ff")(props),
                color: mode("black", "white")(props),
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
