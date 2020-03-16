import { Injectable } from '@angular/core';
import { RequestApi } from '../libraries/request-api';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	token: any;
	constructor(private http: RequestApi) { }

	public getToken(): string {
		return localStorage.getItem('token');
	}
	public isAuthenticated(): boolean {
		return this.getToken ? true : false;
	}

	checkToken() {
		return new Promise((resolve, reject) => {
			this.token = this.getToken();
			if (!this.token) {
				this.http
					.post(`auth`, {
						app_key: environment.app_key,
						app_secret: environment.app_secret
					})
					.then(response => {
						if (response['results']['token']) {
							localStorage.setItem('token', response['results']['token']);
							this.token = response['results']['token'];
							resolve(true);
						} else {
							reject(false);
						}
					});
			} else {
				resolve(true);
			}
		});
	}

}
