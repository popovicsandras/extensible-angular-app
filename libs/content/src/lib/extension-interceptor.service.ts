import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtensionInterceptorService {
  interceptors: Set<any> = new Set();
  constructor() {}
}
