import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "@pages/LandingPage";
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
                    <Route path={"/upload"} element={<UploadPage />} />
                    <Route path={"/donate"} element={<Donations />} />
                    <Route path={"/paste/:id"} element={<PasteDisplay />} />
                    <Route path={"/laudiolin-privacy"} element={<LaudiolinPrivacy />} />
                </Routes>
            </Router>
        );
    }
}

export default App;
