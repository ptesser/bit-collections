import { Component, EventEmitter, Input, Output } from '@angular/core';

import { extractFiles } from '../file';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-file-input-area',
  styleUrls: ['./ngx-file-input-area.component.scss'],
  templateUrl: './ngx-file-input-area.component.html',
})
export class NgxFileInputAreaComponent {

  isDropping = false;

  @Input() label = 'Drop files or click here to upload';
  // tslint:disable-next-line:no-output-native
  @Output() readonly load = new EventEmitter<File[]>();

  constructor() { }

  dropHandler(ev: DragEvent) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer) {
      this.emitLoadFiles(ev.dataTransfer.files);
    }

    this.isDropping = false;
  }

  dragOverHandler(ev: Event) {
    ev.preventDefault();

    this.isDropping = true;
  }

  // tslint:disable-next-line:variable-name
  dragLeaveHandler(_ev: Event) {
    this.isDropping = false;
  }

  onFileChange(ev: Event) {
    const element = ev.target as HTMLInputElement;

    if (element.files) {
      this.emitLoadFiles(element.files);
    }
  }

  private emitLoadFiles(fileList: FileList) {
    const files = extractFiles(fileList);
    this.load.emit(files);
  }
}
