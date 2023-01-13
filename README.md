# Extensible Angular App

## Criterias

- [x] Being able to provide custom template
- [ ] Being able to package static assets as well in the extensions (images, styles, fonts)
  - [ ] Being able to server those in local dev mode
  - [ ] Being able to server those in prod mode
  - [ ] Being able to server those in preview mode
- [x] Share services via injection token from an EDK
- [ ] Routed components
  - [x] As angular modules
  - [x] As angular standalone components
  - [ ] As authenticated user
  - [ ] As unauthenticated user 
- [ ] System plugins
- [ ] Widgets
- [ ] Connected extensions
  - [ ] exposed slots
  - [ ] exposed services?
  - [ ] exposed interfaces?
- [ ] Nextjs market for demoing
- [ ] Nextjs Studio
- [ ] Trying to use anything else than Material?
- [ ] What about different angular versions?
- [x] Assembling in compilation time, docker image creation
- [ ] SSR
- [ ] Trying to use a React component?
- [ ] Differentiate between applications:
  - [ ] Extension developer sandbox
  - [ ] Preview mode
  - [ ] Production mode builder

## Setup

```
npm ci --legacy-peer-deps
```

**--legacy-peer-deps** is only needed because Angular flex layout is not supported anymore, but the demo template still uses it. Obviously, in a real life scenario a template extension would use more uptodate libraries and would be pre-packaged.

## Poor man's Extension Store

Next.js served application to demonstrate an extension store. 

```
npm start extension-repository
```

## Poor man's Solution Builder Application 

## Extensible application

### Development mode

Uses module federation

```
npm start
```

### Production mode

Assembles the extensions into one application, routed modules / standalone components are loaded via angular lazy loading.

```
npm start
```
