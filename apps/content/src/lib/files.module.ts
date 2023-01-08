import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FilesComponent } from './components/files/files.component';

@NgModule({
  declarations: [FilesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FilesComponent,
      },
    ]),
  ],
  providers: [],
})
export class FilesModule {}
