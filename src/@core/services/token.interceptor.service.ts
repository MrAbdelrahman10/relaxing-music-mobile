import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
	HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(
		public auth: AuthService
	) {
	}
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.auth.getToken()}`
			}
		});
		return next.handle(request).pipe(
			tap(
				(event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						// do stuff with response if you want
						if (['UNAUTHORIZED'].indexOf(event.body.statusMessage) > -1) {
							localStorage.removeItem('token');
							this.auth.checkToken()
							.then(() => {
								request = request.clone({
									setHeaders: {
										Authorization: `Bearer ${this.auth.getToken()}`
									}
								});
								next.handle(request).subscribe();
							});
						}
					}
				},
				(err: any) => {
					if (err instanceof HttpErrorResponse) {
						if (err.status === 401) {
							// redirect to the login route or show a modal
							this.auth.checkToken()
							.then(() => next.handle(request).subscribe());
						} else {
							return next.handle(request).subscribe();
						}
					}
				}
			)
		);
	}
}
