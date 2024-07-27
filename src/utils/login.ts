/**
 * Reads the 'redirect' query parameter.
 * Defaults to 'seikimo.moe/'.
 */
export function getRedirectUrl(handoff?: string): string {
    const location = window.location;
    const url = new URLSearchParams(location.search);
    let redirect = url.get("redirect");

    // Check if the redirect is valid.
    if (!redirect || redirect == "") return "https://seikimo.moe/";
    if (!redirect.includes("https://") && !redirect.includes("http://")) {
        redirect = `${location.href.includes("localhost") ?
            "http" : window.isSecureContext ? "https" : "http"}://` + redirect;
    }

    // Check if the handoff code is set.
    if (handoff) {
        redirect += `?handoff=${handoff}`;
    }

    return redirect;
}

/**
 * Checks if the 'handoff' query parameter is set to true.
 * Defaults to false.
 */
export function handoffCode(): boolean {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("handoff");

    return code == "true";
}
