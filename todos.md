- More meaningful components for demoing:
  - content list
  - process list
  - etc
- User avatar
- Better template design

Common errors:
- When and injection token can not be used from the sdk after a folder rename => do some changes in the package.json and package-lock.json and npm install! (delete package-lock.json and redo it) There most be some cache besides, node, nx and angular, which can not be reset, unless this way
- RouteModule's `{ initialNavigation: 'enabledBlocking' }` had to be disabled since it cause problem with dynamic routing, however this might be needed for SSR.

