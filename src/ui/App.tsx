import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "@pages/LandingPage";
import LaudiolinPrivacy from "@pages/LaudiolinPrivacy";
import Donations from "@pages/Donations";

import "@css/App.css";

class App extends React.PureComponent {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path={"/"} element={<LandingPage />} />
                    <Route path={"/laudiolin-privacy"} element={<LaudiolinPrivacy />} />
                    <Route path={"/donate"} element={<Donations />} />
                </Routes>
            </Router>
        );
    }
}

export default App;
