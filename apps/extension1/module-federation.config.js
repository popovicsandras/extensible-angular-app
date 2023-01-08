module.exports = {
  name: 'extension1',
  exposes: {
    './Files': 'apps/extension1/src/lib/files.module.ts',
  },
  additionalShared: [ '@angular/core', '@angular/router', 'sdk' ]
};
