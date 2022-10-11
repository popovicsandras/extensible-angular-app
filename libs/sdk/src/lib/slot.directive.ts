import { Directive, Inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ApplicationSlotService, ApplicationSlotServiceToken } from './application-slot.interfaces';

@Directive({
  // eslint-disable-next-line
  selector: '[slot]',
})
export class AppSlotDirective implements OnInit {
  @Input() public slot = '';

  constructor(
    public viewContainerRef: ViewContainerRef,
    @Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService
  ) {
    console.log(this.slot);
  }

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

    const componentClass = this.applicationSlotService.get(slotName);
    componentClass && viewContainerRef.createComponent<typeof componentClass>(componentClass);
  }

  get name() {
    return this.slot;
  }
}
