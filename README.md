# Architecture Logbook

A logbook for London's architecture: find buildings, check in when you are there, and collect them.

- **Web version:** `index.html`, live at https://jacks94.github.io/architecture-logbook/
- **iPhone app:** `app/` wraps the same app with [Capacitor](https://capacitorjs.com). `app/www/index.html` is the phone build: it starts empty (no sample visits) and uses the phone's real location.
- **Source:** `src/` holds `app.js`, `style.css`, `data.js` (371 buildings and drawings) and `build.py`, which produces both versions.

## How the iPhone build works

There is no Xcode project in this repository. `.github/workflows/ios.yml` creates one on a GitHub Mac each time:

1. `npm install` fetches Capacitor.
2. `npx cap add ios` generates the Xcode project, and `app/ios-setup.sh` adds the permission messages, name and icon.
3. Every push that touches `app/` is test-built for the iPhone simulator.

## TestFlight setup (one-off)

1. Enrol in the Apple Developer Program.
2. In App Store Connect, create the app with bundle ID `com.jacks94.architecturelogbook`.
3. In App Store Connect > Users and Access > Integrations, create an API key with the App Manager role and download the `.p8` file.
4. In this repository's Settings > Secrets and variables > Actions, add four secrets:
   - `ASC_KEY_ID`: the key's ID
   - `ASC_ISSUER_ID`: the issuer ID shown above the key list
   - `ASC_PRIVATE_KEY`: the whole contents of the `.p8` file
   - `APPLE_TEAM_ID`: the Team ID from the Apple Developer membership page
5. Go to Actions > iOS app > Run workflow and tick "Upload to TestFlight".

The upload step has not been run yet, so expect to fix a thing or two on the first try.
