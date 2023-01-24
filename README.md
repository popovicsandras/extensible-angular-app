# Extensible Angular App

## Criterias

- [x] Extensions must be well encapsulated: being able to package static assets as well in the extensions (images, styles, fonts)
  - [x] Being able to server those in local dev mode
  - [x] Being able to server those in prod mode
  - [x] Being able to server those in preview mode
- [x] Share services via injection token from an EDK
- [ ] 4 type of extensions (All hail Joomla)
  - [x] Custom templates as extensions
    - [x] Basic template
    - [x] Custom template
    - [x] Being able to customize system level routes, like 403, 404, custom error, etc...
    - [x] Being able to change the sidebar side and header colour
  - [x] Routed components as extensions
    - [x] As angular modules
    - [x] As angular standalone components
    - [x] As authenticated user
    - [x] As unauthenticated user 
  - [ ] System plugins as extensions
  - [ ] Widgets as extensions
- [ ] Extensions interoperability
  - [ ] exposed slots
  - [ ] exposed services?
  - [ ] exposed interfaces?
- [x] Extension Store for demoing
  - [x] List
  - [x] Upload
- [ ] Studio for demoing
  - [x] Configure app from list of extensions
  - [x] Read extension schema and show editable form
  - [x] Demonstrate with multiple UIs
  - [x] Publish saved configuration under ui uuid
  - [x] Publish manifest for saved configuration under ui uuid
  - [x] Persist extension configuration
  - [x] Websocket refresh on change
  - [ ] Build production mode
- [x] Assembling in compilation time, docker image creation
- [ ] Trying to use anything else than Material?
- [ ] What about different angular versions?
- [ ] SSR
- [ ] Trying to use a React component?

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
