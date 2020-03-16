import { Component } from '@angular/core';
import { RequestApi } from 'src/@core/libraries/request-api';
import { Favorite } from 'src/@core/libraries/favorite';

@Component({
  selector: 'app-favorite',
  templateUrl: 'favorite.page.html',
  styleUrls: ['favorite.page.scss']
})
export class FavoritePage {

  private songs: any = [];

  constructor(private http: RequestApi,
    private fav: Favorite) { }

  ngOnInit(): void {
    const ids = this.fav.get().join(',');
    this.http.get(`songs/${ids}/show_list`).then((res) => {
      this.songs = res['results'];
      this.updateSongs();
    });
  }

  updateSongs() {
    if (this.songs) {
      const favorites = this.fav.get();
      this.songs = this.songs.map((i) => {
        i.is_favorited = favorites.indexOf(i.id) > -1;
        return i;
      });
    }
  }

}
