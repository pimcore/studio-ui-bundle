---
title: OAuth Consent Screen
description: The screen that asks a signed-in user to approve an application's OAuth authorization request.
---

# OAuth Consent Screen

When the OAuth authorization server embedded in the Studio Backend Bundle is enabled, its authorize endpoint
redirects the browser to a screen in Pimcore Studio that asks the signed-in user to allow or deny an
application's request. This page covers that screen. Declaring the scopes it shows is part of building an
OAuth-protected application, described in the Studio Backend Bundle's
[OAuth-Protected Applications](https://github.com/pimcore/studio-backend-bundle/blob/2026.x/doc/04_Development_Details/07_OAuth_Protected_Applications.md)
guide.

The screen shows the requesting application, the host the authorization code is sent to, whether the
application is verified, the requested scopes, and the signed-in user. Allow and Deny both return the browser
to the application. Pimcore Studio never handles the resulting tokens.

## The route

The screen lives at `/oauth/consent` below the configured Pimcore Studio path, so with the default
`pimcore_studio_ui.url_path` it is:

```
/pimcore-studio/oauth/consent?authorization_id=...
```

The authorization server does not derive this path: it sends the browser to whatever
`pimcore_studio_backend.oauth.consent_path` holds. Changing `url_path` therefore means changing
`consent_path` to match, or every authorization request breaks at its first redirect. See
[Custom URL for the UI](./02_Custom_URL_for_the_UI.md) for the full list of paths to keep in sync.

The `authorization_id` identifies the pending authorization. A request that arrives without a usable one, or
names a pending authorization the server does not hold, renders as expired rather than as an error, since
expiry is by far the likeliest reason.

## Authentication

The screen requires an authenticated Pimcore Studio session, and shows which user the application would act
as. A visitor without a live session is sent to the Pimcore Studio login screen and returned afterwards to
the consent request, query string included, so `authorization_id` survives the round trip. The same happens
if the session expires while the screen is open.

This is the reason the authorization server hands off to Pimcore Studio at all: it reuses the existing login,
including two factor authentication, rather than prompting for credentials again.

## Scope labels

Scopes reach the screen as raw identifiers such as `mcp:read`. Their wording comes from the translation
catalogue, which is the only place a scope is described for this screen:

| Key | Purpose |
|---|---|
| `oauth.consent.scope.<slug>.label` | Short line naming what is granted, for example "Read your data" |
| `oauth.consent.scope.<slug>.description` | Optional sentence below the label |

`<slug>` is the scope identifier with every `:` replaced by `-`, because i18next reads `:` as its namespace
separator. The scope `mcp:read` therefore reads `oauth.consent.scope.mcp-read.label`.

A bundle shipping its own scopes adds these keys to its own translations. Both keys are optional, and they
are independent: a scope may have a label and no description.

**A scope with no keys is still shown, as its raw identifier.** Requesting `test:read` without translations
puts the literal string `test:read` on the card. This is deliberate. A scope that could not be described is
one the user is still being asked to grant, so it is never silently dropped, and an untranslated scope on the
screen is a visible reminder that the keys are missing.

The rest of the screen's wording lives under the same prefix: `oauth.consent.title`, `.subtitle`,
`.permissions-heading`, `.allow`, `.deny`, `.signed-in-as`, `.unverified`, `.redirect-to`, `.no-scopes`,
`.retry`, `.error.*` and `.expired.*`.

## Framing

The consent screen is never frameable, whatever CSP is configured to do. Because the approval rests on the
request being same-origin rather than on a CSRF token, a framed consent screen with an overlay above the
Allow button would produce a real approval. See
[Content Security Policy](./01_Content_Security_Policy.md#oauth-consent-screen-exception).
