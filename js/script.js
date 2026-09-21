/**
 * Streamer Social Landing Page
 * Configuration & Dynamic Render Script
 */

// ==========================================================================
// Streamer Configuration Data
// ==========================================================================
const streamerConfig = {
    name: "Drinst",
    handle: "@Drinst",
    bio: "Streamer, creator. Find all of my official social links and community spaces below.",
    avatarUrl: "./assets/profile.jpg",

    socialLinks: [
        {
            name: "Twitch",
            accent: "#9146FF",
            accentAlpha: "rgba(145, 70, 255, 0.25)",
            description: "Watch live streams, chat in real-time, and unlock exclusive channel emotes.",
            buttonText: "Watch Live on Twitch",
            url: "https://www.twitch.tv/drinst",

            // Twitch OAuth (Helix / Identity)
            oauth: {
                enabled: true,
                clientId: "PUBLIC_CLIENT_ID", // -> your Twitch Client ID
                authorizeUrl: "https://id.twitch.tv/oauth2/authorize",
                redirectUri: "REGISTERED_REDIRECT_URI",
                scope: "user:read:email"

                // Optional provider-specific params, e.g.:
                // params: { claims: '{"id_token":{"email":null}}' }
            },

            iconSvg: `<svg class="platform-icon" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57V4.714zm4.715 0H18v5.143h-1.714V4.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0H6zm14.571 11.143l-3.428 3.429h-3.429l-3 3v-3H6.857V1.714h13.714v9.429z"/></svg>`
        },
        {
            name: "Discord",
            accent: "#5865F2",
            accentAlpha: "rgba(88, 101, 242, 0.25)",
            description: "Join our vibrant Discord server to chat off-stream, share memes, and get event news.",
            buttonText: "Join Discord Community",
            url: "https://discord.gg/ZYWJ2JptFb",

            // Discord OAuth2
            oauth: {
                enabled: true,
                clientId: "PUBLIC_CLIENT_ID", // -> your Discord Application ID
                authorizeUrl: "https://discord.com/oauth2/authorize",
                redirectUri: "REGISTERED_REDIRECT_URI",
                scope: "identify"
            },

            iconSvg: `<svg class="platform-icon" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.098.245.195.372.288a.077.077 0 0 1-.006.128 12.299 12.299 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`
        },
        {
            name: "YouTube",
            accent: "#FF0000",
            accentAlpha: "rgba(255, 0, 0, 0.25)",
            description: "Subscribe for stream highlights, edited let's plays, and exclusive video essays.",
            buttonText: "Subscribe on YouTube",
            url: "https://www.youtube.com/@Drinst",

            // Optional OAuth settings — only platforms with oauth.enabled === true
            // get the "Connect Account" button (shown when ?state= is present).
            oauth: {
                enabled: true,
                clientId: "676926884798-ie0gaqghec0rlcjvmcv4cin8rn1gih4f.apps.googleusercontent.com",
                authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
                redirectUri: "https://oauth.mizu.asia/oauth/youtube/callback",
                scope: "https://www.googleapis.com/auth/youtube.readonly",

                // Optional: override/add provider-specific OAuth parameters.
                // Standard params (response_type, client_id, redirect_uri,
                // scope, state) are set by default and can be overridden here.
                // params: {
                //     response_type: "token",
                //     prompt: "consent"
                // }
                params: {
                    access_type: "offline",
                    include_granted_scopes: "true",
                    prompt: "consent"
                }
            },

            iconSvg: `<svg class="platform-icon" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
        },
        {
            name: "TikTok",
            accent: "#25F4EE",
            accentAlpha: "rgba(37, 244, 238, 0.25)",
            description: "Check out bite-sized stream moments, funny clips, and daily short videos.",
            buttonText: "Follow on TikTok",
            url: "https://www.tiktok.com/@_drinst",

            // TikTok OAuth (Login Kit v2) — uses `client_key` instead of
            // `client_id`, so the default param is removed via null and
            // client_key is supplied through `params`.
            oauth: {
                enabled: true,
                clientId: "PUBLIC_CLIENT_KEY", // -> your TikTok Client Key
                authorizeUrl: "https://www.tiktok.com/v2/auth/authorize/",
                redirectUri: "REGISTERED_REDIRECT_URI",
                scope: "user.info.basic",
                params: {
                    client_id: null,      // TikTok does not use client_id
                    client_key: "PUBLIC_CLIENT_KEY"
                }
            },

            iconSvg: `<svg class="platform-icon" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`
        },
        {
            name: "Instagram",
            accent: "#E1306C",
            accentAlpha: "rgba(225, 48, 108, 0.25)",
            description: "Behind-the-scenes photos, setup updates, and personal life stories.",
            buttonText: "Follow on Instagram",
            url: "https://www.instagram.com/",

            // Instagram OAuth (Instagram API with Instagram Login)
            oauth: {
                enabled: true,
                clientId: "PUBLIC_CLIENT_ID", // -> your Instagram App ID
                authorizeUrl: "https://www.instagram.com/oauth/authorize",
                redirectUri: "REGISTERED_REDIRECT_URI",
                scope: "instagram_business_basic"
            },

            iconSvg: `<svg class="platform-icon" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
        },
        {
            name: "Twitter / X",
            accent: "#F3F4F6",
            accentAlpha: "rgba(243, 244, 246, 0.2)",
            description: "Stream schedules, thoughts, real-time updates, and interaction with the community.",
            buttonText: "Follow on Twitter / X",
            url: "https://twitter.com/@_drinst",

            // Twitter / X OAuth 2.0 (uses PKCE — code_challenge required)
            // NOTE: the code_challenge must later be generated per request
            // (S256 hash of a random verifier) when the real flow is wired up.
            oauth: {
                enabled: true,
                clientId: "PUBLIC_CLIENT_ID", // -> your X OAuth 2.0 Client ID
                authorizeUrl: "https://twitter.com/i/oauth2/authorize",
                redirectUri: "REGISTERED_REDIRECT_URI",
                scope: "tweet.read users.read offline.access",
                params: {
                    code_challenge: "GENERATED_PKCE_CODE_CHALLENGE",
                    code_challenge_method: "S256"
                }
            },

            iconSvg: `<svg class="platform-icon" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
        }
    ]
};

// ==========================================================================
// OAuth Account-Link State Detection (Discord Linking Flow)
// ==========================================================================
// When the page is opened from the Discord account-link flow, the URL carries
// an OAuth `state` query parameter (e.g. verify.html?state=xyz987).
// Normal visitors have no `state` parameter and see the standard page.
function getOAuthState() {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of params) {
        if (key.toLowerCase() === "state") {
            return value;
        }
    }
    return null;
}

function shouldShowConnectButton(platform, state) {
    return Boolean(state)
        && Boolean(platform.oauth)
        && platform.oauth.enabled === true;
}

/**
 * Builds the platform's OAuth authorization URL.
 *
 * Standard parameters (response_type, client_id, redirect_uri, scope, state)
 * are set by default via URLSearchParams. Providers that need different or
 * additional parameters can override/add them per platform via
 * `oauth.params` (a plain key/value object), so no manual string
 * concatenation is ever needed.
 */
function buildOAuthUrl(platform, state) {
    const oauth = platform.oauth;

    const authParams = new URLSearchParams({
        response_type: "code",
        client_id: oauth.clientId,
        redirect_uri: oauth.redirectUri,
        scope: oauth.scope,
        state: state
    });

    // Provider-specific overrides / extra parameters (flexible per platform).
    // A value of `null` removes a default parameter entirely — useful for
    // providers like TikTok that use `client_key` instead of `client_id`.
    if (oauth.params) {
        Object.entries(oauth.params).forEach(([key, value]) => {
            if (value === null) {
                authParams.delete(key);
            } else {
                authParams.set(key, value);
            }
        });
    }

    return `${oauth.authorizeUrl}?${authParams.toString()}`;
}

function getConnectButtonText(platform) {
    return platform.oauth.connectButtonText || `Connect ${platform.name} Account`;
}

// ==========================================================================
// Initialization & Render Logic
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initProfile();
    renderSocialCards();
    initActionTools();

    // Auto-update footer year
    document.getElementById("year").textContent = new Date().getFullYear();
});

function initProfile() {
    document.getElementById("profile-avatar").src = streamerConfig.avatarUrl;
    document.getElementById("profile-avatar").alt = streamerConfig.name;
    document.getElementById("profile-name").textContent = streamerConfig.name;
    document.getElementById("profile-handle").textContent = streamerConfig.handle;
    document.getElementById("profile-bio").textContent = streamerConfig.bio;
    document.getElementById("footer-name").textContent = streamerConfig.name;
}

function renderSocialCards() {
    const container = document.getElementById("social-links");
    container.innerHTML = "";

    // Read the OAuth `state` once for the whole render cycle.
    // No `state` in the URL -> normal visitor mode, no Connect buttons.
    const oauthState = getOAuthState();

    streamerConfig.socialLinks.forEach((platform, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-platform", platform.name);

        // CSS Custom Properties for dynamic platform accenting
        card.style.setProperty("--platform-accent", platform.accent);
        card.style.setProperty("--platform-accent-alpha", platform.accentAlpha);

        // Only show the Connect button when the page was opened with an OAuth
        // `state` parameter AND the platform has oauth.enabled === true.
        const connectButtonHtml = shouldShowConnectButton(platform, oauthState) ? `
                        <a href="${buildOAuthUrl(platform, oauthState)}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="cta-button oauth-connect"
                           aria-label="${getConnectButtonText(platform)}">
                            <span>${getConnectButtonText(platform)}</span>
                            <svg class="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                            </svg>
                        </a>` : "";

        card.innerHTML = `
            <button class="card-trigger" 
                    aria-expanded="false" 
                    aria-controls="drawer-${index}" 
                    id="trigger-${index}">
                <div class="card-left">
                    <div class="icon-wrapper">
                        ${platform.iconSvg}
                    </div>
                    <span class="platform-name">${platform.name}</span>
                </div>
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
            <div class="card-drawer" 
                 id="drawer-${index}" 
                 role="region" 
                 aria-labelledby="trigger-${index}">
                <div class="drawer-content">
                    <div class="drawer-inner">
                        <p class="platform-desc">${platform.description}</p>
                        ${connectButtonHtml}
                        <a href="${platform.url}" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="cta-button">
                            <span>${platform.buttonText}</span>
                            <svg class="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Card Interaction Event Listener
        const trigger = card.querySelector(".card-trigger");
        trigger.addEventListener("click", () => toggleCard(card));

        container.appendChild(card);
    });
}

// ==========================================================================
// Interaction Handling (Two-Step Accordion Logic)
// ==========================================================================
function toggleCard(targetCard) {
    const isExpanded = targetCard.classList.contains("expanded");
    const allCards = document.querySelectorAll(".card");

    // Close all other open cards
    allCards.forEach(card => {
        if (card !== targetCard && card.classList.contains("expanded")) {
            card.classList.remove("expanded");
            const trigger = card.querySelector(".card-trigger");
            trigger.setAttribute("aria-expanded", "false");
        }
    });

    // Toggle current target card
    if (isExpanded) {
        targetCard.classList.remove("expanded");
        targetCard.querySelector(".card-trigger").setAttribute("aria-expanded", "false");
    } else {
        targetCard.classList.add("expanded");
        targetCard.querySelector(".card-trigger").setAttribute("aria-expanded", "true");
    }
}

// ==========================================================================
// Native Copy Link Feature
// ==========================================================================
function initActionTools() {
    const copyBtn = document.getElementById("copy-link-btn");
    const copyText = document.getElementById("copy-text");

    copyBtn.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            copyText.textContent = "Copied!";

            setTimeout(() => {
                copyText.textContent = "Copy Link";
            }, 2000);
        } catch (err) {
            console.error("Failed to copy link: ", err);
        }
    });
}