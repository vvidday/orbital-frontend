import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { theme } from "./chakra/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    // React Strictmode causes components to render twice - temporarily disabling.
    //<React.StrictMode>
    <>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
        </ChakraProvider>
    </>
    //</React.StrictMode>
);
