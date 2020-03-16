import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RequestApi {

	constructor(private http: HttpClient) { }

	get(url) {
		return new Promise((resolve, reject) => {
			this.http
				.get(`${environment.api_url}/${url}`)
				.subscribe(response => {
					resolve(response);
				}, (error) => reject(error));
		});
	}

	post(url, body) {
		return new Promise((resolve, reject) => {
			this.http
				.post(`${environment.api_url}/${url}`, body)
				.subscribe(response => {
					resolve(response);
				}, (error) => reject(error));
		});
	}

	put(url, body) {
		return new Promise((resolve, reject) => {
			this.http
				.put(`${environment.api_url}/${url}`, body)
				.subscribe(response => {
					resolve(response);
				}, (error) => reject(error));
		});
	}

	delete(url) {
		return new Promise((resolve, reject) => {
			this.http
				.delete(`${environment.api_url}/${url}`)
				.subscribe(response => {
					resolve(response);
				}, (error) => reject(error));
		});
	}

}
