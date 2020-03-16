import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class Favorite {

	private readonly storage_key = 'favorites';

	constructor() { }

	get() {
		const favorites_str = localStorage.getItem(this.storage_key);
		try {
			const favorites = JSON.parse(favorites_str);
			return Array.isArray(favorites) ? favorites : [];
		} catch (error) {
			localStorage.removeItem(this.storage_key);
			return [];
		}
	}

	add(id) {
		let favorites = this.get();
		if (favorites.indexOf(id) > -1) {
			return false;
		}
		favorites.push(id);
		localStorage.setItem(this.storage_key, JSON.stringify(favorites));
	}

	remove(id) {
		let favorites = this.get();
		if (favorites.indexOf(id) === -1) {
			return false;
		}
		favorites = favorites.filter((v) => v != id);
		localStorage.setItem(this.storage_key, JSON.stringify(favorites));
	}

}
