module.exports = {
  // This is only needed for development server, since nx's @nrwl/angular:module-federation-dev-server
  // reads this values and start those remotes
  // During thre preview (development) mode start, we fetch remotes by the manifest.json file
  name: 'apa-template-extension',
  exposes: {
    './Template': 'libs/apa-template/src/lib/template/template.component.ts'
  },
  additionalShared: [
    '@angular/core',
    '@angular/router',
    '@angular/material',
    '@angular/cdk',
    'sdk'
  ]
};
