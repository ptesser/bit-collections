import { Component } from '@angular/core';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SwalService } from 'src/app/ui/swal/swal.service';

import { Table, fields, AgGridField, TableService } from 'src/app/ui/table/table.module';

interface User {
  id: string;
  username: string;
  email: string;
}

const users: User[] = [
  { id: '1', username: 'ptesser', email: 'p.tesser921@gmail.com' },
  { id: '2', username: 'elisa', email: 'elisa@gmail.com' },
  { id: '3', username: 'puppa', email: 'puppa@gmail.com' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-collections';

  readonly fakeTable = new Table(
    () => of(users).pipe(map((data) => ({ count: data.length, data }))),
    fields(
      this.tableFactory.makeModelField(AgGridField, 'id').makeSortable().makeHeader('Id'),
      this.tableFactory.makeModelField(AgGridField, 'username').makeSortable().makeFilterable().makeHeader('Username'),
      this.tableFactory.makeModelField(AgGridField, 'email').makeSortable().makeHeader('Email'),
    ),
  );

  constructor(
    private readonly swal: SwalService,
    private readonly tableFactory: TableService<User>,
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
