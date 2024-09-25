
## All files

- [ ] Replace TODO instances

## `package.json`

- [ ] Remove these dependencies if they aren't needed:
  - seedrandom
  - lodash.clonedeep

## `README`

- [ ] Customize this for the game

## `manifest.json`

- [ ] Change or remove `orientation` if needed
- [ ] Update `categories`
- [ ] Update `icons`
- [ ] Update `screenshots`

## `src/images`

- [ ] Add screenshots and reflect them in:
  - [ ] `index.html`
  - [ ] `manifest.json`
  - [ ] `webpack.config.js`

## PWA

- [ ] Use Lighthouse in Chrome developer tools to verify that the app is installable and meets PWA requirements.

## Google Analytics

- [ ] See https://github.com/skedwards88/react-base?tab=readme-ov-file#google-analytics
- [ ] Update the `G_TODO` id in `index.html`

## Google Play

- [ ] Can use pwabuilder.com to package the PWA for Google Play
  - [ ] If using the default GitHub Pages URL:
    - `Package ID` is `APP_NAME.io.github.skedwards88.twa`
    - `Host` is the full URL (e.g. `skedwards88.github.io/APP_NAME`)
    - `Start URL` is `/`
- [ ] Store the app key and app key info securely
- [ ] Upload the .aab file to Google Play
- [ ] Update the sha 256 fingerprint in the assetlinks.json file with the re-signed value on Google Play
- [ ] If using the default GitHub Pages URL, upload the asset links to https://github.com/skedwards88/.well-known

## Other

- Add a hook to prevent pushing to main without running linters
