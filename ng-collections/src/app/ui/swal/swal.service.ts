import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

export const SwalDismissReason = Swal.DismissReason;

/**
 * This service use version 9.* of the library.
 */
@Injectable()
export class SwalService {

  show(opts: SweetAlertOptions): Promise<SweetAlertResult> {
    return Swal.fire({
      ...opts,
      allowOutsideClick: false,
      buttonsStyling: true,
      // TODO: Implement custom button style
      // cancelButtonClass: 'mat-raised-button mat-button-base',
      // confirmButtonClass: 'mat-raised-button mat-button-base mat-primary',
      reverseButtons: true,
    });
  }

  /**
   * Show a swal of type "error"
   */
  showError(opts: SweetAlertOptions) {
    return this.show({ ...opts, icon: 'error' });
  }

  /**
   * Show a swal of type "error" in toast mode
   */
  showErrorToast(opts: SweetAlertOptions) {
    return this.show({
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      ...opts,
      toast: true,
      icon: 'error',
    });
  }

  /**
   * Show a swal of type "confirm"
   */
  showConfirm(opts: SweetAlertOptions) {
    return this.show({
      ...opts,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
    });
  }

  /**
   * Show a swal of type "success"
   */
  showSuccess(opts: SweetAlertOptions) {
    return this.show({ ...opts, icon: 'success' });
  }

  /**
   * Show a swal of type "success" in toast mode
   */
  showSuccessToast(opts: SweetAlertOptions) {
    return this.show({
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      ...opts,
      icon: 'success',
      toast: true,
      width: '20rem',
    });
  }

  /**
   * Show a swal of type "input" and do nothing upon cancel
   */
  showInput(opts: SweetAlertOptions) {
    return this.show({
      input: 'text',
      ...opts,
      showCancelButton: true,
      showConfirmButton: true,
    });
  }

  /**
   * Show a swal of type "warning"
   */
  showWarning(opts: SweetAlertOptions) {
    return this.show({ ...opts, icon: 'warning' });
  }
}
