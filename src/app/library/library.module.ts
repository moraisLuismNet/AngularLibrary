import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';

import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { LibraryRoutingModule } from './library-routing.module';
import { PublishingHousesComponent } from './publishing-houses/publishing-houses.component';
import { LibraryService } from './library.service';
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [PublishingHousesComponent, AuthorsComponent, BooksComponent, LibraryComponent],
  imports: [CommonModule, LibraryRoutingModule, SharedModule,
    FormsModule, TableModule, ButtonModule,
    ConfirmDialogModule, DialogModule
  ],
  providers: [LibraryService]
})
export class LibraryModule {}

