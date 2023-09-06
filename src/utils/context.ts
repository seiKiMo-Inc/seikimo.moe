let currentContext: HTMLElement | null = null;
window.addEventListener("click", closeContext);

/**
 * Handles clicking around the page.
 *
 * @param e The event.
 */
export function closeContext(e: MouseEvent): void {
    // Check if the click was within the confines of the context menu.
    if (currentContext && !currentContext.contains(e.target as Node)) {
        currentContext.style.display = "none";
        currentContext = null;
    }
}

/**
 * Sets the current context menu.
 *
 * @param element The context menu to set.
 */
export function openContext(element: HTMLElement): void {
    // Close any open context menus.
    if (currentContext) {
        currentContext.style.display = "none";
    }

    // Set the current context menu.
    currentContext = element;
}
