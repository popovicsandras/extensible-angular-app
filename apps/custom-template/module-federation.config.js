module.exports = {
  name: 'custom-template',
  exposes: {
    './Routes': 'apps/custom-template/src/app/remote-entry/routes.ts',
    './Template': 'apps/custom-template/src/app/remote-entry/template/template.component.ts'
  },
  additionalShared: [ '@angular/core', '@angular/router', 'sdk' ]
};
