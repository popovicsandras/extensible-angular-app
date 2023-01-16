# Extensible Angular App

## Criterias

- [x] Being able to provide custom template
  - [x] Being able to customize system level routes, like 403, 404
- [ ] Being able to package static assets as well in the extensions (images, styles, fonts)
  - [x] Being able to server those in local dev mode
  - [x] Being able to server those in prod mode
  - [ ] Being able to server those in preview mode
- [x] Share services via injection token from an EDK
- [x] Routed components as extensions
  - [x] As angular modules
  - [x] As angular standalone components
  - [x] As authenticated user
  - [x] As unauthenticated user 
- [ ] System plugins as extensions
- [ ] Widgets as extensions
- [ ] Connect extensions
  - [ ] exposed slots
  - [ ] exposed services?
  - [ ] exposed interfaces?
- [x] Nextjs market for demoing
  - [x] List
  - [x] Upload
- [ ] Demo Nextjs for demoing
  - [ ] Configure app from list of extensions
  - [ ] Read extension schema and show editable form
  - [ ] Persist extension configuration
  - [ ] Build production mode
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
npm start studio
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
