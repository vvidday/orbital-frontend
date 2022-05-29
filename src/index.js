import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // React Strictmode causes components to render twice - temporarily disabling.
    //<React.StrictMode>
    <ChakraProvider>
        <App />
    </ChakraProvider>
    //</React.StrictMode>
);
