#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const patchExe = path.join(__dirname, '..', 'bin', 'win32', 'patch.exe');

if (process.platform !== 'win32') {
  console.log('gnu-patch: skipping install because this host is not Windows.');
  process.exit(0);
}

if (!fs.existsSync(patchExe)) {
  console.error('gnu-patch: bundled patch.exe is missing. Reinstall the package.');
  process.exit(1);
}

console.log('gnu-patch: patch.exe ready at', patchExe);
