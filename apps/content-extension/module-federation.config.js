module.exports = {
  // This is only needed for development server, since nx's @nrwl/angular:module-federation-dev-server
  // reads this values and start those remotes
  // During thre preview (development) mode start, we fetch remotes by the manifest.json file
  name: 'content-extension',
  exposes: {
    './Files': 'apps/content-extension/src/lib/files.module.ts',
  },
  additionalShared: [ '@angular/core', '@angular/router', 'sdk' ]
};
