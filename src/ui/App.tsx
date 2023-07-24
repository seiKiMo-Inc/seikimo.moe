import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "@pages/LandingPage";
import LoginPage from "@pages/LoginPage";
import UploadPage from "@pages/UploadPage";
import PastePage from "@pages/PastePage";
import Donations from "@pages/Donations";
import PasteDisplay from "@pages/PasteDisplay";
import LaudiolinPrivacy from "@pages/LaudiolinPrivacy";

import "@css/App.css";
import "highlight.js/styles/github-dark.css";

class App extends React.PureComponent {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path={"/"} element={<LandingPage />} />
                    <Route path={"/paste"} element={<PastePage />} />
                    <Route path={"/login"} element={<LoginPage />} />
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
