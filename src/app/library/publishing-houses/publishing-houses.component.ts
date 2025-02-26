import { Component, OnInit, ViewChild } from '@angular/core';
import { LibraryService } from '../library.service';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { IPublishingHouse } from '../library.interface';


@Component({
  selector: 'app-publishing-houses',
  templateUrl: './publishing-houses.component.html',
  styleUrls: ['./publishing-houses.component.css'],
  providers: [ConfirmationService],
})
export class PublishingHousesComponent implements OnInit {
  constructor(
    private libraryService: LibraryService,
    private confirmationService: ConfirmationService
  ) {}
  @ViewChild('form') form!: NgForm;
  visibleError = false;
  errorMessage = '';
  publishingHouses: IPublishingHouse[] = [];
  visibleConfirm = false;

  publishingHouse: IPublishingHouse = {
    idPublishingHouse: 0,
    name: '',
  };

  ngOnInit(): void {
    this.getPublishingHouses();
  }

  getPublishingHouses() {
    this.libraryService.getPublishingHouses().subscribe({
      next: (data) => {
        console.log(data);
        this.visibleError = false;
        this.publishingHouses = data;
      },
      error: (err) => {
        this.visibleError = true;
        this.controlError(err);
      },
    });
  }

  save() {
    if (this.publishingHouse.idPublishingHouse === 0) {
      this.libraryService.addPublishingHouse(this.publishingHouse).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.form.reset();
          this.getPublishingHouses();
        },
        error: (err) => {
          console.log(err);
          this.visibleError = true;
          this.controlError(err);
        },
      });
    } else {
      this.libraryService.updatePublishingHouse(this.publishingHouse).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.cancelEdition();
          this.form.reset();
          this.getPublishingHouses();
        },
        error: (err) => {
          this.visibleError = true;
          this.controlError(err);
        },
      });
    }
  }

  edit(publishingHouse: IPublishingHouse) {
    this.publishingHouse = { ...publishingHouse };
  }

  cancelEdition() {
    this.publishingHouse = {
      idPublishingHouse: 0,
      name: '',
    };
  }

  confirmDelete(publishingHouse: IPublishingHouse) {
    this.confirmationService.confirm({
      message: `Delete the publishingHouse ${publishingHouse.name}?`,
      header: 'Are you sure?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deletePublishingHouse(publishingHouse.idPublishingHouse!),
    });
  }

  deletePublishingHouse(id: number) {
    this.libraryService.deletePublishingHouse(id).subscribe({
      next: (data) => {
        this.visibleError = false;
        this.form.reset({
          name: '',
        });
        this.getPublishingHouses();
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

