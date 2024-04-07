import React from "react";

import { Routes, Route } from "react-router-dom";

import LandingPage from "@pages/LandingPage";
import ChatPage from "@pages/ChatPage";
import LoginPage from "@pages/LoginPage";
import PastePage from "@pages/PastePage";
import UploadPage from "@pages/UploadPage";
import Donations from "@pages/Donations";
import DeleteAccount from "@pages/DeleteAccount";
import LaudiolinTerms from "@pages/LaudiolinTerms";
import LaudiolinPrivacy from "@pages/LaudiolinPrivacy";

import PasteDisplay from "@pages/PasteDisplay";

import "@css/App.scss";
import "@css/Icons.scss";

import "highlight.js/styles/github-dark.css";
import "react-tooltip/dist/react-tooltip.css";

class App extends React.PureComponent {
    render() {
        return (
            <Routes>
                <Route path={"/"} element={<LandingPage />} />
                <Route path={"/chat"} element={<ChatPage />} />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/paste"} element={<PastePage />} />
                <Route path={"/upload"} element={<UploadPage />} />
                <Route path={"/donate"} element={<Donations />} />
                <Route path={"/account/delete"} element={<DeleteAccount />} />

                <Route path={"/terms/laudiolin"} element={<LaudiolinTerms />} />
                <Route path={"/privacy/laudiolin"} element={<LaudiolinPrivacy />} />

                <Route path={"/paste/:id"} element={<PasteDisplay />} />
                <Route path={"/login/:srv"} element={<LoginPage />} />
            </Routes>
        );
    }
}

export default App;
