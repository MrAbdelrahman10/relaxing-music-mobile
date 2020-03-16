import { Component, OnInit } from '@angular/core';
import { RequestApi } from 'src/@core/libraries/request-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: 'song.page.html',
  styleUrls: ['song.page.scss']
})
export class SongPage implements OnInit {

  public song: any;

  constructor(private route: ActivatedRoute, private http: RequestApi) {
  }

  ngOnInit(): void {
    this.http.get('songs/' + this.route.snapshot.params['id']).then((res) => {
      this.song = res['results'];
    });
  }

}
