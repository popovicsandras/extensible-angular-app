import { Directive, Inject, Input, OnInit, Optional, ViewContainerRef } from '@angular/core';
import { ApplicationSlotService, ApplicationSlotServiceToken } from './application-slot.interfaces';

@Directive({
  standalone: true,
  // eslint-disable-next-line
  selector: '[slot]',
})
export class AppSlotDirective implements OnInit {
  @Input() public slot = '';

  constructor(
    public viewContainerRef: ViewContainerRef,
    @Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService
  ) {}

  ngOnInit(): void {
    if (!this.applicationSlotService.has(this.slot)) {
      console.error(`Slot "${this.slot}" doesn't have any assigned component!`);
    }

    this.loadComponent();
  }

  loadComponent() {
    const viewContainerRef = this.viewContainerRef;
    const slotName = this.name;
    viewContainerRef.clear();

    const slotDetails = this.applicationSlotService.get(slotName);
    if (slotDetails) {
      const ComponentClass = slotDetails.component;
      const componentRef: any = viewContainerRef.createComponent(ComponentClass);
      Object.keys(slotDetails.options).forEach(key => {
        componentRef.instance[key] = slotDetails.options[key];
      })
    }
  }

  get name() {
    return this.slot;
  }
}
