- [x] Being able to provide custom template
- [x] Share services via injection token from an EDK
- [ ] Routed components
  - [x] As angular modules
  - [ ] As angular standalone components
  - [ ] As authenticated user
  - [ ] As unauthenticated user 
- [ ] System plugins
- [ ] Widgets
- [ ] Dependent extensions (how to define contracts, expose slots, etc...)
- [ ] Nextjs market for demoing
- [ ] Nextjs Studio
- [ ] Trying to use anything else than Material?
- [ ] What about different angular versions?
- [ ] Assembling in compilation time, docker image creation
- [ ] SSR
- [ ] Trying to use a React component?


TODO:
- Restructure the content the same way as the template
- Do we need this: "allowedNonPeerDependencies": ["@extensible-angular-app/sdk"] ?
- Test the static build with multiple extensions, not just with one (+process as a standalone component)
- More meaningful components for demoing:
  - content list
  - process list
  - etc
- User avatar
- Better template design

Common errors:
- When and injection token can not be used from the sdk after a folder rename => do some changes in the package.json and package-lock.json and npm install! (delete package-lock.json and redo it) There most be some cache besides, node, nx and angular, which can not be reset, unless this way
- RouteModule's `{ initialNavigation: 'enabledBlocking' }` had to be disabled since it cause problem with dynamic routing, however this might be needed for SSR.

