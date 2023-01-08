module.exports = {
  // This is only needed for development server, since nx's @nrwl/angular:module-federation-dev-server
  // reads this values and start those remotes
  // During thre preview (development) mode start, we fetch remotes by the manifest.json file
  name: 'mf-custom-template',
  exposes: {
    './Template': 'libs/template/src/lib/template/template.component.ts'
  },
  additionalShared: [ '@angular/core', '@angular/router', 'sdk' ]
};
