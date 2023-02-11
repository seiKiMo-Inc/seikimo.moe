import React from "react";

class LaudiolinPrivacy extends React.Component {
    render() {
        return (
            <div className="PrivacyPolicyPage" style={{ padding: 30, paddingLeft: 50 }}>
                <h1>Privacy Policy</h1>
                <p>Last updated and effective: February 6, 2022</p>
                <p>This privacy policy applies to the app <strong>Laudiolin</strong> developed by seiKiMo-Inc who we may refer to as "we".</p>
                <p>Your privacy is important to us. Our policy is to respect your privacy regarding any information we may collect from you across our websites, services, and utilities. The Privacy Policies for each of our services provide a more detailed explanation of what data we store for each of our services, how long it is retained, how you can request for your data to be deleted, and more.</p>
                <p>By using our services, you agree to the collection and use of information in accordance with this policy.</p>
                <br></br>
                <h2>Information we collect</h2>
                <p>By default, Laudiolin stores little data on its own. All data Laudiolin stores is as follows:</p>
                <ul>
                    <li>Your Discord Account username</li>
                    <li>Your Discord Account ID</li>
                    <li>Your Discord Account Avatar</li>
                    <li>Your Discord Account Discriminator</li>
                    <li>Your Playlists</li>
                    <li>Your Playlist Songs</li>
                    <li>Your Recently Played Songs</li>
                    <li>Your Liked Songs</li>
                </ul>
                <p>If you choose "Login as Guest", Laudiolin does not collect any information about you, but you will also not be able to access some of the features such as making playlists. However, if you choose to use the "Login with Discord" feature, Laudiolin will collect the information mentioned above.</p>
                <p>By using Laudiolin, you agree to the collection and use of information in accordance with this policy.</p>
                <br></br>
                <h2>How we use your information</h2>
                <p>We use your Discord account details as mentioned above for identifying who the data they create while using Laudiloin belongs to.</p>
                <p>We use your playlists, playlist songs, recently played songs, and liked songs for cross-compatibilty.</p>
                <br></br>
                <h2>How long we retain your information</h2>
                <p>We retain your Discord account details for as long as you use Laudiolin.</p>
                <p>We retain your playlists, playlist songs, recently played songs, and liked songs for as long as you use Laudiolin.</p>
                <br></br>
                <h2>How to request for your data to be deleted</h2>
                <p>If you wish to request for your data to be deleted, please contact us at <a href="mailto:support@seikimo.moe">support@seikimo.moe</a>.</p>
                <br></br>
                <h2>Changes to this policy</h2>
                <p>We may update this policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>
                <br></br>
                <h2>Contact us</h2>
                <p>If you have any questions about this policy or our privacy practices, please contact us at <a href="mailto:support@seikimo.moe">support@seikimo.moe</a>.</p>
            </div>
        );
    }
}

export default LaudiolinPrivacy;