import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  /* eslint-disable-next-line @angular-eslint/component-selector */
  selector: 'slot-component',
  template: `
  <ng-container *ngIf="(slot$ | async) as slot">
    <ng-template slot="{{slot}}"></ng-template>
  </ng-container>`
})
export class SlotComponent {
  public slot$: Observable<string> | undefined;
  constructor(route: ActivatedRoute) {
    this.slot$ = route.data.pipe(
      map(data => data?.['slot'])
    );
  }
}
