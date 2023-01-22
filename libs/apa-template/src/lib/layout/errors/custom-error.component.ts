import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [MatIconModule],
  /* eslint-disable-next-line @angular-eslint/component-selector */
  selector: 'error',
  template: `
  <div class="container">
    <div><mat-icon fontIcon="{{icon}}"></mat-icon></div>
    <div>{{message}}</div>
  </div>`,
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
      }
    }
  `]
})
export class CustomErrorComponent {
  @Input()
  message!: string;

  @Input()
  icon!: string;
}
