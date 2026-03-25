# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

"Tab Saver" — a browser extension that exports all open tab titles and URLs to a text file. Two separate implementations exist side-by-side for different browsers.

## Architecture

### `FireFox/` — Firefox (Manifest V2)
- Uses `browser.*` APIs (Firefox WebExtensions)
- `browser_action` triggers directly via `onClicked` listener in `background.js` — no popup UI
- Requires `tabs` + `downloads` permissions
- Background script runs as a persistent script declared in manifest

### `Brave/tab_save/` — Chromium/Brave (Manifest V3)
- Uses `chrome.*` APIs
- Has a popup UI (`popup.html` + `popup.js`) with a button to trigger the save
- `background.js` exists but is dead code — the manifest uses `default_popup` so `onClicked` never fires
- Only requires `tabs` permission; download is done via anchor element click (no `downloads` permission)
- `background.html` loads `background.js` but serves no purpose in current setup

## Key Differences Between the Two Versions

| Aspect | Firefox | Brave/Chromium |
|---|---|---|
| Manifest version | V2 | V3 |
| Trigger | Icon click (no popup) | Button in popup |
| Download method | `browser.downloads.download()` | Anchor element `.click()` |
| API namespace | `browser.*` (Promise-based) | `chrome.*` (callback-based) |

## Development

No build step. Load as unpacked extension in the target browser:
- **Firefox**: `about:debugging` → "This Firefox" → "Load Temporary Add-on" → select `FireFox/manifest.json`
- **Brave/Chrome**: `brave://extensions` or `chrome://extensions` → enable Developer Mode → "Load unpacked" → select `Brave/tab_save/`

## Known Issues

- Brave version's `background.js` and `background.html` are unused because `default_popup` is set (which prevents `onClicked` from firing). The manifest also lacks the `downloads` permission that `background.js` would need.
- Neither version groups tabs by window.
