# gnu-patch

Npm wrapper that ships pre-extracted patch binaries and exposes them via the package bin entry (`patch`). Currently includes the GnuWin32 build; the structure allows adding other platforms.

## Install

- Global (adds `patch` to PATH via npm's global bin): `npm install -g gnu-patch`
- Project-scoped (available via `npx patch` or `node_modules/.bin/patch`): `npm install gnu-patch`

## Layout

- `bin/win32/patch.exe` — bundled GnuWin32 binary.
- `bin/win32/docs/` — upstream docs and man pages (`patch.1.txt`, `patch.1p.txt`, `AUTHORS`, `COPYING`, `ChangeLog`).
- Entry point: `index.js` (wired via `package.json` `bin` field to `patch`).

## Platform behavior

- Currently ships only the Windows binary; additional platforms can be added under `bin/<platform>/`.
- Until other binaries are added, non-Windows hosts will exit with an explanatory error.

## Postinstall

- On Windows, `scripts/postinstall.js` only verifies that `bin/win32/patch.exe` exists; there are no downloads or extractions.
- On non-Windows hosts, postinstall prints a skip notice and exits.

## Usage

- Global install: `patch --version` should work immediately (npm global bin is typically on PATH on Windows).
- Local install: use `npx patch` or `node_modules/.bin/patch` (no system PATH changes).
- If `patch.exe` ever goes missing, run `npm rebuild gnu-patch` or reinstall to restore bundled files.

## License

MIT
