import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: (props) => ({
            body: {
                backgroundColor: mode("white", "#091523")(props),
                color: mode("black", "whiteAlpha.800")(props),
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