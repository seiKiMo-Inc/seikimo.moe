import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "@pages/LandingPage";
import ChatPage from "@pages/ChatPage";
import LoginPage from "@pages/LoginPage";
import PastePage from "@pages/PastePage";
import UploadPage from "@pages/UploadPage";
import Donations from "@pages/Donations";
import LaudiolinPrivacy from "@pages/LaudiolinPrivacy";

import PasteDisplay from "@pages/PasteDisplay";

import "@css/App.css";
import "highlight.js/styles/github-dark.css";

class App extends React.PureComponent {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path={"/"} element={<LandingPage />} />
                    <Route path={"/chat"} element={<ChatPage />} />
                    <Route path={"/login"} element={<LoginPage />} />
                    <Route path={"/paste"} element={<PastePage />} />
                    <Route path={"/upload"} element={<UploadPage />} />
                    <Route path={"/donate"} element={<Donations />} />
                    <Route path={"/laudiolin-privacy"} element={<LaudiolinPrivacy />} />

                    <Route path={"/paste/:id"} element={<PasteDisplay />} />
                    <Route path={"/login/:srv"} element={<LoginPage />} />
                </Routes>
            </Router>
        );
    }
}

export default App;
