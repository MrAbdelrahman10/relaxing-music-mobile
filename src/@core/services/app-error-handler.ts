import { ErrorHandler, Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
	providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {

	constructor(private toastService: ToastService) { }

	handleError(err: any) {
		console.log('[error.handler]', err);
		this.toastService.presentErrorToast("Unexpected error is happend, try again.");
	}

}
