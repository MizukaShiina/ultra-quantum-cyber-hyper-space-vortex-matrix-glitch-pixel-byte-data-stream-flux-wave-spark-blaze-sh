/* ==========================================================================
   Callback result page — fully adaptive from URL params, zero logic.

   The bot 302s the browser here after the OAuth callback completes:
       ?platform=youtube&status=success
       ?platform=youtube&status=error&reason=invalid_state
   Unknown / missing params fall back to a neutral "nothing to process" state.
   ========================================================================== */

(function () {
    "use strict";

    var PORTAL_URL = "../"; // site root = the linktree

    /* ------------------------------------------------------------------ */
    /* Platform map — add entries here when a new platform goes live.     */
    /* ------------------------------------------------------------------ */
    var PLATFORMS = {
        youtube: {
            name: "YouTube",
            accent: "#FF0000",
            light: false,
            icon: '<svg viewBox="0 0 24 24"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>'
        },
        tiktok: {
            name: "TikTok",
            accent: "#FE2C55",
            light: false,
            icon: '<svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>'
        },
        instagram: {
            name: "Instagram",
            accent: "#E1306C",
            light: false,
            icon: '<svg viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.15A3.99 3.99 0 1 1 16 12a3.99 3.99 0 0 1-4 3.99zm7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z"/></svg>'
        },
        twitter: {
            name: "Twitter / X",
            accent: "#f3f4f6",
            light: true,
            icon: '<svg viewBox="0 0 24 24"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z"/></svg>'
        }
    };

    /* ------------------------------------------------------------------ */
    /* Reason map — the bot currently sends status only; when it starts   */
    /* sending reason= these messages light up automatically.             */
    /* ------------------------------------------------------------------ */
    var REASONS = {
        invalid_state: "The link request expired or was already used. Link requests last 10 minutes - start again from the portal.",
        already_linked: "This account is already connected to a Discord user.",
        token_exchange: "The platform refused the connection. Please try again.",
        link_failed: "Something went wrong while saving the link. Please try again."
    };

    /* ------------------------------------------------------------------ */
    function getParam(name) {
        var value = new URLSearchParams(window.location.search).get(name);
        return value ? value.trim().toLowerCase() : "";
    }

    function setText(el, text) {
        el.textContent = text;
    }

    function main() {
        var platformKey = getParam("platform");
        var status = getParam("status"); // success | error | (empty)
        var reason = getParam("reason");

        var validStatus = status === "success" || status === "error";
        var card = document.getElementById("result-card");
        var title = document.getElementById("result-title");
        var message = document.getElementById("result-message");
        var actionBtn = document.getElementById("action-btn");
        var actionText = document.getElementById("action-text");
        var plate = document.getElementById("platform-icon");
        var body = document.body;

        var platform = PLATFORMS[platformKey] || null;
        var displayStatus = validStatus ? status : "neutral";

        // Status everywhere: <body>, the card, and which badge icon shows.
        body.dataset.status = displayStatus;
        card.dataset.status = displayStatus;
        document.getElementById("badge-" + displayStatus).style.display = "block";
        document.getElementById("status-badge").style.display = "flex";

        // Platform identity.
        if (platform) {
            plate.innerHTML = platform.icon;
            plate.dataset.light = platform.light ? "true" : "false";
            document.documentElement.style.setProperty("--platform-accent", platform.accent);
        } else {
            // No known platform: generic link glyph.
            plate.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
        }

        // Title + message.
        if (validStatus) {
            var name = platform ? platform.name : "Account";
            if (status === "success") {
                setText(title, name + " linked!");
                setText(message, "Your " + name.toLowerCase() + " account is connected. You can close this tab now.");
            } else {
                setText(title, "Linking failed");
                setText(message, REASONS[reason] ||
                    (name + " could not be linked. Please try again from the portal."));
            }
        } else {
            // Opened directly / unknown params: neutral page.
            setText(title, "Nothing to process");
            setText(message, "This page shows the result of an account-linking attempt. If you got here by accident, you can safely close this tab.");
        }

        // Action button.
        setText(actionText, (validStatus && status === "error") ? "Try again" : "Return to portal");
        actionBtn.href = PORTAL_URL;

        // On success, politely try to close the tab. Only works when the tab
        // was opened by a script (e.g. a popup); otherwise this is a no-op
        // and the visible "close this tab" message covers it.
        if (displayStatus === "success") {
            setTimeout(function () {
                window.close();
            }, 1600);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", main);
    } else {
        main();
    }
})();
