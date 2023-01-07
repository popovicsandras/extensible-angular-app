import { NxWelcomeComponent } from "./components/nx-welcome.component";

export const appRoutes = [
  { path: '', component: NxWelcomeComponent },
  // { path: 'extension1', loadChildren: () => import('./lazy-modules/lazy-1.module').then(m => m.LazyModule) },
];
