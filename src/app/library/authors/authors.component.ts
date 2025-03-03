import { Component, OnInit, ViewChild } from '@angular/core';
import { LibraryService } from '../library.service';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { IAuthor } from '../library.interface';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  providers: [ConfirmationService],
})
export class AuthorsComponent implements OnInit {
  constructor(
    private libraryService: LibraryService,
    private confirmationService: ConfirmationService
  ) {}
  @ViewChild('form') form!: NgForm;
  visibleError = false;
  errorMessage = '';
  authors: IAuthor[] = [];
  visibleConfirm = false;

  author: IAuthor = {
    idAuthor: 0,
    nameAuthor: '',
  };

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors() {
    this.libraryService.getAuthors().subscribe({
      next: (data) => {
        console.log(data);
        this.visibleError = false;
        this.authors = data;
      },
      error: (err) => {
        this.visibleError = true;
        this.controlError(err);
      },
    });
  }

  save() {
    if (this.author.idAuthor === 0) {
      this.libraryService.addAuthor(this.author).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.form.reset();
          this.getAuthors();
        },
        error: (err) => {
          console.log(err);
          this.visibleError = true;
          this.controlError(err);
        },
      });
    } else {
      this.libraryService.updateAuthor(this.author).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.cancelEdition();
          this.form.reset();
          this.getAuthors();
        },
        error: (err) => {
          this.visibleError = true;
          this.controlError(err);
        },
      });
    }
  }

  edit(author: IAuthor) {
    this.author = { ...author };
  }

  cancelEdition() {
    this.author = {
      idAuthor: 0,
      nameAuthor: '',
    };
  }

  confirmDelete(author: IAuthor) {
    this.confirmationService.confirm({
      message: `Delete the author ${author.nameAuthor}?`,
      header: 'Are you sure?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteAuthor(author.idAuthor!),
    });
  }

  deleteAuthor(id: number) {
    this.libraryService.deleteAuthor(id).subscribe({
      next: (data) => {
        this.visibleError = false;
        this.form.reset({
          name: '',
        });
        this.getAuthors();
      },
      error: (err) => {
        this.visibleError = true;
        this.controlError(err);
      },
    });
  }

  controlError(err: any) {
    if (err.error && typeof err.error === 'object' && err.error.message) {
      this.errorMessage = err.error.message;
    } else if (typeof err.error === 'string') {
      // If `err.error` is a string, it is assumed to be the error message
      this.errorMessage = err.error;
    } else {
      // Handles the case where no useful error message is received
      this.errorMessage = 'An unexpected error has occurred';
    }
  }
}
