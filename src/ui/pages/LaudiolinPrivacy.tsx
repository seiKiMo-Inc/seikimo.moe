import React from "react";

class LaudiolinPrivacy extends React.Component {
    render() {
        return (
            <div
                className="PrivacyPolicyPage"
                style={{ padding: 30, paddingLeft: 50 }}
            >
                <h1 className={"text-lg font-bold"}>Privacy Policy</h1>
                <p>Last updated and effective: April 7, 2024</p>

                <br />

                <p>This privacy policy applies to the app <strong>Laudiolin</strong> developed by seiKiMo-Inc who we may
                    refer to as "we".</p>
                <p>Your privacy is important to us. Our policy is to respect your privacy regarding any information we
                    may collect from you across our websites, services, and utilities. The Privacy Policies for each of
                    our services provide a more detailed explanation of what data we store for each of our services, how
                    long it is retained, how you can request for your data to be deleted, and more.</p>
                <p>By using our services, you agree to the collection and use of information in accordance with this
                    policy.</p>

                <br />

                <h1 className={"text-lg font-bold"}>Information we collect</h1>
                <p>By default, Laudiolin stores little data on its own. When logged in, Laudiolin collects the following:</p>
                <ul className={"pl-4"}>
                    <li>Your chosen display name</li>
                    <li>Your username (chosen or assigned by SSO)</li>
                    <li>A link to your chosen profile picture</li>
                    <li>Your email address</li>
                    <li>Your password (if using a seiKiMo account) as a hash</li>
                    <li>Your seiKiMo account ID</li>
                    <li>Any information relating to playlists created or imported with Laudiolin</li>
                    <li>Any metadata associated with tracks you favorite or play with Laudiolin</li>
                </ul>

                <br />

                <p>If you choose to log in with a social provider, the following data might be collected:</p>
                <ul className={"pl-4"}>
                    <li>Your Discord account ID</li>
                    <li>Authentication tokens for reading authorized Discord account data</li>
                    <li>Your Google account ID</li>
                    <li>Authentication tokens for reading authorized Google account data</li>
                </ul>

                <br></br>

                <p>If you choose "Login as Guest", Laudiolin does not collect any information about you, but you will
                    also not be able to access some of the features such as making playlists.</p>
                <p>However, if you choose to
                    use the "Login with seiKiMo" feature, Laudiolin will collect the information mentioned above.</p>
                <p>By using Laudiolin, you agree to the collection and use of information in accordance with this
                    policy.</p>

                <br></br>

                <h2 className={"text-lg font-bold"}>How we use your information</h2>
                <p>We use your account details as mentioned above for identifying who the data they create while using Laudiolin belongs to.</p>
                <p>We use your playlists, playlist songs, recently played songs, and liked songs for creating a seamless experience between various Laudiolin platforms.</p>
                <p>We use your social provider account data to personalize your Laudiolin experience by reusing your account's profile picture.</p>

                <br></br>

                <h2 className={"text-lg font-bold"}>How long we retain your information</h2>
                <p>We retain your account details for as long as you use Laudiolin.</p>
                <p>We retain your playlists, playlist songs, recently played songs, and liked songs for as long as you
                    use Laudiolin.</p>

                <br></br>

                <h2 className={"text-lg font-bold"}>How to request for your data to be deleted</h2>
                <p>If you wish to request for your data to be deleted, please contact us at <a
                    className={"text-blue-500"} href="mailto:support@seikimo.moe">support@seikimo.moe</a>.
                </p>

                <p>
                    Alternatively, you can go to <a
                    className={"text-blue-500"} href={`${window.origin}/account/delete`}>the account deletion page
                </a> to immediately delete your account.
                </p>

                <br></br>

                <h2 className={"text-lg font-bold"}>Changes to this policy</h2>
                <p>We may update this policy from time to time in order to reflect, for example, changes to our
                    practices or for other operational, legal or regulatory reasons.</p>

                <br></br>

                <h2 className={"text-lg font-bold"}>Contact us</h2>
                <p>If you have any questions about this policy or our privacy practices, please contact us at <a
                    className={"text-blue-500"} href="mailto:support@seikimo.moe">support@seikimo.moe</a>.</p>
            </div>
        );
    }
}

export default LaudiolinPrivacy;
