import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ApplicationSlotService, ApplicationSlotServiceToken } from '@extensible-angular-app/sdk';

@Component({
  selector: 'files',
  templateUrl: `./files.component.html`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class FilesComponent implements OnInit {
  constructor(@Inject(ApplicationSlotServiceToken) private applicationSlotService: ApplicationSlotService) {}

  ngOnInit() {
    console.log(this.applicationSlotService);
  }
}
