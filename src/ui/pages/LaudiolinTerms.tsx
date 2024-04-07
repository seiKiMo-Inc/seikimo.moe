import React from "react";

function LaudiolinTerms() {
    return (
        <div
            style={{ padding: 30, paddingLeft: 50 }}
        >
            <h1 className={"text-lg font-bold"}>Terms of Service</h1>
            <p>Welcome to Laudiolin, a music streaming service provided by seiKiMo-Inc. These Terms of Service ("Terms")
                govern your access to and use of Laudiolin's website, mobile app, and desktop app ("Services"). By
                accessing or using our Services, you agree to be bound by these Terms.</p>

            <br />

            <h2 className={"text-lg font-bold"}>Your Agreement to These Terms</h2>
            <p>By accessing or using the Laudiolin, you agree to be bound by these Terms, whether you are a
                registered user or simply a visitor. If you do not agree to these Terms, please do not use our
                Services.</p>

            <br />

            <h2 className={"text-lg font-bold"}>Use of the Services</h2>
            <p>2.1. Eligibility: You must be at least 13 years old to use the Laudiolin. If you are under 18,
                you may only use the Services with the involvement of a parent or guardian.</p>
            <p>2.2. Account Registration: You may need to create an account to access certain features of the Services.
                You agree to provide accurate and complete information during the registration process and to keep your
                account information up to date.</p>
            <p>2.3. User Content: By using Laudiolin, you can engage in various activities related to user-generated content, including:
                <ul className={"pl-5"}>
                    <li>Creating playlists</li>
                    <li>Liking songs</li>
                    <li>Importing playlists</li>
                    <li>Setting playlist icons</li>
                    <li>Sharing playlists</li>
                </ul>
                When providing URLs to any off-site content, you agree that you have the right to share such content and that
                it does not violate any laws or regulations.
            </p>

            <br />

            <h2 className={"text-lg font-bold"}>Content on the Services</h2>
            <p>You agree not to use the Laudiolin for any unlawful or prohibited purpose.
                This includes, but is not limited to, the following:</p>
            <ul className={"pl-5"}>
                <li>Creating or transmitting any content that infringes the rights of others or violates any
                    law or regulation.
                </li>
                <li>Interfering with or disrupting the operation of the Services.</li>
                <li>Attempting to gain unauthorized access to any portion of the Services.</li>
            </ul>

            <br />

            <h2 className={"text-lg font-bold"}>Termination</h2>
            <p>seiKiMo-Inc reserves the right to terminate or suspend your access to Laudiolin at any time,
                with or without cause and with or without notice.</p>

            <br />

            <h2 className={"text-lg font-bold"}>Modifications to the Terms</h2>
            <p>We may revise these Terms from time to time. The most current version will always be available on the
                seiKiMo website.</p>

            <br />

            <h2 className={"text-lg font-bold"}>Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at <a
                className={"text-blue-500"} href="mailto:support@seikimo.moe">support@seikimo.moe</a>.</p>

            <br />

            <p>By using Laudiolin, you agree to abide by these Terms. Thank you for choosing Laudiolin!</p>
        </div>
    );
}

export default LaudiolinTerms;
