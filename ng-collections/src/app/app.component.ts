import { Component } from '@angular/core';

import { SwalService } from 'src/app/ui/swal/swal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-collections';

  constructor(
    private readonly swal: SwalService,
  ) {
  }

  showErrorHandler() {
    this.swal.showError({ title: 'Something went wrong', text: 'Error description' });
  }

  showSuccessHandler() {
    this.swal.showSuccess({ title: 'Gret job!' });
  }

  showWarningHandler() {
    this.swal.showWarning({ title: 'Attention baby!' });
  }

  showToastErrorHandler() {
    this.swal.showErrorToast({ title: 'Something went wrong' });
  }

  showToastSuccessHandler() {
    this.swal.showSuccessToast({ title: 'Gret job!' });
  }
}
