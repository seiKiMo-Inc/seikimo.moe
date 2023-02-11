import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "@pages/LandingPage";
import LaudiolinPrivacy from "@pages/LaudiolinPrivacy";

import '@css/App.css';

class App extends React.Component {
    // connectToWebsocket() {
    //     const message = {
    //         _id: 1,
    //         username: "test user" + Math.random(),
    //         message: "Hello from client" + Math.random(),
    //         timestamp: new Date().getTime()
    //     }
    //
    //     const socket = new WebSocket("ws://localhost:3000/socket");
    //
    //     socket.onopen = () => {
    //         console.log("Connected to websocket");
    //         socket.send(JSON.stringify(message));
    //     }
    //
    //     socket.onmessage = (message) => {
    //         console.log(message);
    //     }
    //
    //     socket.onclose = () => {
    //         console.log("Disconnected from websocket");
    //     }
    // }

    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/laudiolin-privacy" element={<LaudiolinPrivacy />} />
                </Routes>
            </Router>
        );
    }
}

export default App;
