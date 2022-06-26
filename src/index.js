import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { theme } from "./chakra/theme";

export const Index = () => {
    return (
        <>
            <ChakraProvider theme={theme}>
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                <App />
            </ChakraProvider>
        </>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    // React Strictmode causes components to render twice - temporarily disabling.
    //<React.StrictMode>
    <Index />
    //</React.StrictMode>
);
