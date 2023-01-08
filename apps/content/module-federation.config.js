module.exports = {
  name: 'content',
  exposes: {
    './Files': 'apps/content/src/lib/files.module.ts',
  },
  additionalShared: [ '@angular/core', '@angular/router', 'sdk' ]
};
