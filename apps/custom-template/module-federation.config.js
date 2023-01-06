module.exports = {
  name: 'custom-template',
  exposes: {
    './Template': 'libs/template/src/lib/template/template.component.ts'
  },
  additionalShared: [ '@angular/core', '@angular/router', 'sdk' ]
};
