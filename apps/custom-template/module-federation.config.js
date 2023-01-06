module.exports = {
  name: 'custom-template',
  exposes: {
    './Routes': 'apps/custom-template/src/app/remote-entry/routes.ts',
    './Template': 'libs/template/src/lib/template/template.component.ts'
  },
  additionalShared: [ '@angular/core', '@angular/router', 'sdk' ]
};
