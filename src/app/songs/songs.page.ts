import { Component, OnInit } from '@angular/core';
import { RequestApi } from 'src/@core/libraries/request-api';
import { ActivatedRoute } from '@angular/router';
import { Favorite } from 'src/@core/libraries/favorite';
import { ToastService } from 'src/@core/services/toast.service';

@Component({
  selector: 'app-songs',
  templateUrl: 'songs.page.html',
  styleUrls: ['songs.page.scss']
})
export class SongsPage implements OnInit {

  private songs: any = [];

  constructor(private route: ActivatedRoute,
    private http: RequestApi,
    private fav: Favorite,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.http.get('songs/' + this.route.snapshot.params['id'] + '/category').then((res) => {
      this.songs = res['results'] && res['results']['data'];
      this.updateSongs();
    });
  }

  addFavorite(song) {
    this.fav.add(song);
    this.updateSongs();
    this.toastService.presentToast("Song has been added to favorite.");
  }

  removeFavorite(id) {
    this.fav.remove(id);
    this.updateSongs();
    this.toastService.presentToast("Song has been removed from favorite.");
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
