import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "@pages/LandingPage";
import UploadPage from "@pages/UploadPage";
import Donations from "@pages/Donations";
import LaudiolinPrivacy from "@pages/LaudiolinPrivacy";

import "@css/App.css";

class App extends React.PureComponent {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path={"/"} element={<LandingPage />} />
                    <Route path={"/upload"} element={<UploadPage />} />
                    <Route path={"/donate"} element={<Donations />} />
                    <Route path={"/laudiolin-privacy"} element={<LaudiolinPrivacy />} />
                </Routes>
            </Router>
        );
    }
}

export default App;
