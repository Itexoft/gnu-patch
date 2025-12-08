#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const BIN_PATHS = {
  win32: path.join(__dirname, 'bin', 'win32', 'patch.exe')
};

function run() {
  const exe = BIN_PATHS[process.platform];

  if (!exe) {
    console.error(`gnu-patch: supported only on Windows (detected ${process.platform}).`);
    process.exit(1);
  }

  if (!fs.existsSync(exe)) {
    console.error('gnu-patch: patch.exe is missing. Reinstall the package or run `npm rebuild gnu-patch`.');
    process.exit(1);
  }

  const child = spawn(exe, process.argv.slice(2), {
    stdio: 'inherit',
    windowsHide: true
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code === undefined ? 1 : code);
  });

  child.on('error', (error) => {
    console.error('gnu-patch: failed to launch patch.exe:', error.message);
    process.exit(1);
  });
}

if (require.main === module) {
  run();
}

module.exports = { run };
