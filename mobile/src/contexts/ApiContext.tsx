import * as React from "react";
import { WEBSOCKET_URL } from "@env";
const ApiContext = React.createContext();

function connectToSocket() {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket(WEBSOCKET_URL);
        socket.onopen = () => {
            socket.send('Connection Established');
            console.info("Connection Established");

            resolve(socket);
        }
        socket.onclose = (e) => {
            console.info("Connection Closed");
            reject(e);
        };
    });
}

export function ApiProvider(props) {
    const [socket, setSocket] = React.useState();
    const [result, setResult] = React.useState();

    const value = [socket, setSocket, result, setResult];

    const debug = false;

    React.useEffect(() => {
        (async () => {
            try {
                const socket = await connectToSocket();
                socket.addEventListener('message', (event) => {
                    const str = event.data;
                    const parts = str.split(" Data received as: ");
                    const socketResult = parts[parts.length - 1];
                    if (debug) console.log("socketResult", str);
                    if (socketResult.length <= 20) {
                        setResult(socketResult);
                        return;
                    }
            
                    console.log("failing result", str);
                });
                setSocket(socket);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    return <ApiContext.Provider value={value} {...props} />
}

export function useApi() {
    const context = React.useContext(ApiContext);
    if (context === undefined) {
        throw new Error("useApi must be used within a ApiProvider");
    }
    return context;
}