import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';

import { FilesComponent } from './components/files/files.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [FilesComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
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
