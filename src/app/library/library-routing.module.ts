import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { PublishingHousesComponent } from './publishing-houses/publishing-houses.component';
import { BooksComponent } from './books/books.component';
import { LibraryComponent } from './library.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LibraryComponent,
    children: [
      { path: '', redirectTo: '/library/publishingHouses', pathMatch: 'full' },
      { path: 'publishingHouses', component: PublishingHousesComponent },
      { path: 'authors', component: AuthorsComponent },
      { path: 'books', component: BooksComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule {}
