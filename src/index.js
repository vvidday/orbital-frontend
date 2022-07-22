import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { theme } from "./chakra/theme";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

export const Index = () => {
    const { code } = useParams();
    return (
        <>
            <ChakraProvider theme={theme}>
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />

                <App code={code} />
            </ChakraProvider>
        </>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    // React Strictmode causes components to render twice - temporarily disabling.
    //<React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index />}></Route>
            <Route path="/:code" element={<Index />}></Route>
        </Routes>
    </BrowserRouter>

    //</React.StrictMode>
);
