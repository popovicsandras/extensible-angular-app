module.exports = {
  name: 'extension1',
  exposes: {
    './Module': 'apps/extension1/src/app/remote-entry/entry.module.ts',
  },
  additionalShared: [ '@angular/core', '@angular/router', 'sdk' ]
};
