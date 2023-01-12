
const { name } = require('./package.json');
module.exports = {
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/libs/custom-template",
  "lib": {
    "entryFile": "src/index.ts"
  },
  "assets": [
    // Here we could do even smarter, if more complex case is needed, using postcss transformations, etc...
    { "input": "assets", "glob": "**/*", "output": "assets/" + name }
    // "assets"
  ],
  "allowedNonPeerDependencies": [
    "@angular/flex-layout",
    "material-design-icons",
    "hammerjs"
  ]
}
