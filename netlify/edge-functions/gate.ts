/**
 * gate.ts — sign-in wall for the MoBros docs site.
 *
 * Runs at the edge on EVERY request, before Netlify serves anything. That
 * placement is the whole point: the docs are a static site, so a login screen
 * inside the React app would protect the rendered pages and nothing else —
 * `/llms-full.txt` and every `/llm/*.md` file would still be one curl away.
 * Enforcing here means no byte of content leaves the CDN without a session.
 *
 * The flow
 * ────────
 *   1. No session cookie → this function returns the sign-in page itself
 *      (inline HTML, no site assets needed — allowlisting `/assets/*` would
 *      leak the content, since Docusaurus bundles page text into JS chunks).
 *   2. The page runs Google sign-in and POSTs the Firebase ID token back to
 *      `/_gate/session`.
 *   3. We hand that token to the existing backend, which verifies it with the
 *      Admin SDK and checks the user's roles in Firestore — the same source of
 *      truth the dashboard uses. Grant someone dashboard access and they get
 *      docs access for free.
 *   4. On success we mint our own short-lived HMAC-signed cookie. Every
 *      subsequent request is verified locally at the edge, so there's no
 *      backend round-trip per asset.
 *
 * Required environment variables (Netlify → Site configuration → Environment):
 *   DOCS_SESSION_SECRET        long random string; signs the session cookie
 *   DOCS_API_URL               backend base incl. /api, e.g. https://…/api
 *   DOCS_FIREBASE_API_KEY      \
 *   DOCS_FIREBASE_AUTH_DOMAIN   > same public web config as the dashboard
 *   DOCS_FIREBASE_PROJECT_ID   /
 * Optional:
 *   DOCS_GATE_SECRET           shared secret sent to the backend, so only this
 *                              function can call the docs-auth endpoint
 *
 * One-time setup that is easy to miss: add the docs domain to Firebase Console
 * → Authentication → Settings → Authorized domains, or Google sign-in fails
 * with `auth/unauthorized-domain`.
 */

import type { Config, Context } from "@netlify/edge-functions";

const COOKIE = "mobros_docs";
const SESSION_HOURS = 12;

// ── Session cookie: base64url(payload).base64url(hmac) ─────────────────────

interface Session {
  sub: string;
  email: string;
  exp: number; // epoch seconds
}

function b64uEncode(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64uDecode(text: string): Uint8Array {
  const pad = text.length % 4 ? "=".repeat(4 - (text.length % 4)) : "";
  const bin = atob(text.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function signSession(session: Session, secret: string): Promise<string> {
  const body = b64uEncode(new TextEncoder().encode(JSON.stringify(session)));
  const sig = await crypto.subtle.sign(
    "HMAC",
    await hmacKey(secret),
    new TextEncoder().encode(body),
  );
  return `${body}.${b64uEncode(new Uint8Array(sig))}`;
}

async function readSession(
  token: string | null,
  secret: string,
): Promise<Session | null> {
  if (!token) return null;
  const dot = token.indexOf(".");
  if (dot < 1) return null;

  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  let ok = false;
  try {
    // crypto.subtle.verify is constant-time — don't hand-roll the comparison.
    ok = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(secret),
      b64uDecode(sig),
      new TextEncoder().encode(body),
    );
  } catch {
    return null;
  }
  if (!ok) return null;

  try {
    const session = JSON.parse(
      new TextDecoder().decode(b64uDecode(body)),
    ) as Session;
    if (!session?.exp || session.exp * 1000 < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

function readCookie(request: Request, name: string): string | null {
  const raw = request.headers.get("cookie");
  if (!raw) return null;
  for (const part of raw.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) {
      return decodeURIComponent(part.slice(eq + 1).trim());
    }
  }
  return null;
}

/** No Max-Age: the cookie dies when the browser closes, which is the right
 *  default on a shared shop machine. `exp` inside the payload is the hard cap. */
function setCookieHeader(value: string): string {
  return `${COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

const CLEAR_COOKIE = `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;

// ── The sign-in page ────────────────────────────────────────────────────────

function signInPage(cfg: {
  apiKey: string;
  authDomain: string;
  projectId: string;
}): string {
  const firebaseConfig = JSON.stringify({
    apiKey: cfg.apiKey,
    authDomain: cfg.authDomain,
    projectId: cfg.projectId,
  });

  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Sign in · MoBros Admin Docs</title>
<link rel="icon" href="data:,">
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh; display: grid; place-items: center; padding: 24px;
    background: #0a0a0a; color: #f5f5f5;
    font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .card {
    width: 100%; max-width: 380px; background: #141414;
    border: 1px solid #2a2a2a; border-radius: 14px; padding: 32px 28px; text-align: center;
  }
  .mark {
    width: 46px; height: 46px; margin: 0 auto 18px; border-radius: 11px;
    background: #eab308; color: #0a0a0a; display: grid; place-items: center;
    font-size: 22px; font-weight: 900;
  }
  h1 { font-size: 18px; font-weight: 700; letter-spacing: -0.01em; }
  .sub { margin-top: 6px; font-size: 13px; color: #a1a1aa; }
  button {
    margin-top: 22px; width: 100%; padding: 11px 16px; border-radius: 10px;
    border: 1px solid #333; background: #1c1c1c; color: #f5f5f5;
    font-size: 14px; font-weight: 600; cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center; gap: 9px;
    transition: background 150ms ease, border-color 150ms ease;
  }
  button:hover:not(:disabled) { background: #242424; border-color: #3f3f3f; }
  button:disabled { opacity: .6; cursor: progress; }
  button:focus-visible { outline: 2px solid #eab308; outline-offset: 2px; }
  .msg {
    margin-top: 16px; font-size: 13px; line-height: 1.5; text-align: left;
    border-radius: 9px; padding: 11px 13px; display: none;
  }
  .msg.show { display: block; }
  .msg.error { background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.3); color: #fca5a5; }
  .msg.info  { background: rgba(234,179,8,.1);  border: 1px solid rgba(234,179,8,.3);  color: #fde047; }
  .foot { margin-top: 20px; font-size: 12px; color: #71717a; }
</style>
</head>
<body>
  <main class="card">
    <div class="mark" aria-hidden="true">M</div>
    <h1>MoBros Admin Docs</h1>
    <p class="sub">Sign in with the same Google account you use for the dashboard.</p>

    <button id="go" type="button">
      <svg width="17" height="17" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.2-.4-4.7H24v8.9h11.8c-.5 2.7-2 5-4.4 6.6v5.5h7.1c4.1-3.8 6.6-9.4 6.6-16.3z"/>
        <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.6-3.9-12.3-9.1H4.3v5.7C7.9 41.1 15.4 46 24 46z"/>
        <path fill="#FBBC05" d="M11.7 28.2c-.4-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2v-5.7H4.3A22 22 0 0 0 2 24c0 3.6.9 6.9 2.3 9.9l7.4-5.7z"/>
        <path fill="#EA4335" d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.1 29.9 2 24 2 15.4 2 7.9 6.9 4.3 14.1l7.4 5.7c1.7-5.2 6.6-9.1 12.3-9.1z"/>
      </svg>
      <span id="label">Sign in with Google</span>
    </button>

    <p id="msg" class="msg" role="status" aria-live="polite"></p>
    <p class="foot">Staff access only.</p>
  </main>

<script type="module">
const FIREBASE_CONFIG = ${firebaseConfig};
const SDK = "https://www.gstatic.com/firebasejs/12.15.0";

const btn = document.getElementById("go");
const label = document.getElementById("label");
const msg = document.getElementById("msg");

function say(text, kind) {
  msg.textContent = text;
  msg.className = "msg show " + (kind || "error");
}

let auth, GoogleAuthProvider, signInWithPopup;

try {
  const [app, authMod] = await Promise.all([
    import(SDK + "/firebase-app.js"),
    import(SDK + "/firebase-auth.js"),
  ]);
  ({ GoogleAuthProvider, signInWithPopup } = authMod);
  auth = authMod.getAuth(app.initializeApp(FIREBASE_CONFIG));
} catch (err) {
  console.error(err);
  btn.disabled = true;
  say("Couldn't load the sign-in library. Check your connection and reload.");
}

btn.addEventListener("click", async () => {
  if (!auth) return;
  btn.disabled = true;
  label.textContent = "Signing in\\u2026";
  msg.className = "msg";

  try {
    // Always show the account chooser: without it the popup silently reuses
    // whichever Google account the browser is already signed into, and someone
    // whose staff role lives on a different account gets rejected with no clue
    // why. Same reasoning as the dashboard's login screen.
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const cred = await signInWithPopup(auth, provider);
    const idToken = await cred.user.getIdToken();

    label.textContent = "Checking access\\u2026";
    const res = await fetch("/_gate/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    if (res.ok) {
      label.textContent = "Done";
      location.reload();
      return;
    }

    const body = await res.json().catch(() => ({}));
    if (res.status === 403) {
      say((body.message || "That account doesn't have staff access.") +
          " If your access is on another Google account, sign in with that one.");
    } else {
      say(body.message || "Sign-in failed (" + res.status + "). Please try again.");
    }
  } catch (err) {
    console.error(err);
    const code = err && err.code;
    if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
      msg.className = "msg";
    } else if (code === "auth/popup-blocked") {
      say("Your browser blocked the sign-in popup. Allow popups for this site and try again.");
    } else if (code === "auth/unauthorized-domain") {
      say("This domain isn't authorised in Firebase yet. An admin needs to add it under Authentication \\u2192 Settings \\u2192 Authorized domains.");
    } else {
      say("Sign-in failed. Please try again.");
    }
  }

  btn.disabled = false;
  label.textContent = "Sign in with Google";
});
</script>
</body>
</html>`;
}

function html(body: string, status: number, extra?: HeadersInit): Response {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
      ...(extra as Record<string, string>),
    },
  });
}

function json(data: unknown, status: number, extra?: HeadersInit): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...(extra as Record<string, string>),
    },
  });
}

// ── Handler ─────────────────────────────────────────────────────────────────

export default async function gate(
  request: Request,
  context: Context,
): Promise<Response> {
  const env = (name: string) => Deno.env.get(name) ?? "";

  const secret = env("DOCS_SESSION_SECRET");
  const apiUrl = env("DOCS_API_URL").replace(/\/$/, "");
  const firebase = {
    apiKey: env("DOCS_FIREBASE_API_KEY"),
    authDomain: env("DOCS_FIREBASE_AUTH_DOMAIN"),
    projectId: env("DOCS_FIREBASE_PROJECT_ID"),
  };

  // Misconfiguration fails CLOSED. A gate that opens when its config is missing
  // is worse than no gate, because everyone assumes it's working.
  if (!secret || !apiUrl || !firebase.apiKey || !firebase.authDomain) {
    console.error("[gate] missing required environment variables");
    return html(
      "<!doctype html><meta charset=utf-8><title>Unavailable</title>" +
        "<body style='font-family:system-ui;background:#0a0a0a;color:#f5f5f5;" +
        "display:grid;place-items:center;height:100vh;margin:0;text-align:center'>" +
        "<div><h1 style='font-size:18px'>Docs are temporarily unavailable</h1>" +
        "<p style='color:#a1a1aa;font-size:14px'>The sign-in service isn't configured. " +
        "An admin needs to check the site's environment variables.</p></div>",
      503,
    );
  }

  const url = new URL(request.url);

  // ── Auth endpoints ────────────────────────────────────────────────────────

  if (url.pathname === "/_gate/signout") {
    return new Response(null, {
      status: 302,
      headers: { location: "/", "set-cookie": CLEAR_COOKIE, "cache-control": "no-store" },
    });
  }

  if (url.pathname === "/_gate/session") {
    if (request.method !== "POST") {
      return json({ ok: false, message: "Method not allowed" }, 405);
    }

    let idToken = "";
    try {
      idToken = ((await request.json()) as { idToken?: string })?.idToken ?? "";
    } catch {
      /* fall through to the empty-token check */
    }
    if (!idToken) return json({ ok: false, message: "No token supplied" }, 400);

    // Hand off to the backend: it owns Admin SDK verification and the Firestore
    // roles map, so docs access can't drift from dashboard access.
    let verdict: Response;
    try {
      const headers: Record<string, string> = {
        authorization: `Bearer ${idToken}`,
        accept: "application/json",
      };
      const gateSecret = env("DOCS_GATE_SECRET");
      if (gateSecret) headers["x-docs-gate-secret"] = gateSecret;

      verdict = await fetch(`${apiUrl}/docs-auth/me`, {
        method: "GET",
        headers,
        signal: AbortSignal.timeout(10_000),
      });
    } catch (err) {
      console.error("[gate] backend unreachable:", err);
      return json(
        { ok: false, message: "Couldn't reach the access service. Try again shortly." },
        502,
      );
    }

    if (verdict.status === 401) {
      return json({ ok: false, message: "That sign-in expired. Please try again." }, 401);
    }
    if (verdict.status === 403) {
      return json({ ok: false, message: "That account doesn't have staff access." }, 403);
    }
    if (!verdict.ok) {
      console.error("[gate] backend returned", verdict.status);
      return json({ ok: false, message: "Access check failed. Try again shortly." }, 502);
    }

    const user = (await verdict.json().catch(() => ({}))) as {
      uid?: string;
      email?: string;
    };

    const cookie = await signSession(
      {
        sub: user.uid ?? "unknown",
        email: user.email ?? "",
        exp: Math.floor(Date.now() / 1000) + SESSION_HOURS * 3600,
      },
      secret,
    );

    return json({ ok: true }, 200, { "set-cookie": setCookieHeader(cookie) });
  }

  // ── Everything else needs a session ───────────────────────────────────────

  const session = await readSession(readCookie(request, COOKIE), secret);

  if (session) {
    const response = await context.next();

    // `private` on everything: gated content must never sit in a shared cache
    // where the next visitor could be served it without a session. Docusaurus
    // fingerprints /assets/*, so those can still be cached hard in the reader's
    // own browser — without that, every page view refetches the whole bundle.
    response.headers.set(
      "cache-control",
      url.pathname.startsWith("/assets/")
        ? "private, max-age=31536000, immutable"
        : "private, no-store",
    );
    response.headers.set("x-robots-tag", "noindex, nofollow");
    return response;
  }

  // 401 rather than a redirect: `curl` and crawlers get an honest refusal, and
  // the browser still renders the body, so the sign-in page appears in place.
  // Signing in then reloads the same URL and the reader lands where they meant
  // to go — no `?next=` parameter, and no open-redirect to get wrong.
  return html(signInPage(firebase), 401, { "set-cookie": CLEAR_COOKIE });
}

export const config: Config = {
  path: "/*",
};
