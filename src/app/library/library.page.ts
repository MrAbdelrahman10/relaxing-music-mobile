import { Component, OnInit } from '@angular/core';
import { RequestApi } from 'src/@core/libraries/request-api';

@Component({
  selector: 'app-library',
  templateUrl: 'library.page.html',
  styleUrls: ['library.page.scss']
})
export class LibraryPage implements OnInit {

  public categories: any = [];

  constructor(private http: RequestApi) {
  }

  ngOnInit(): void {
    this.http.get('categories').then((res) => {
      this.categories = res['results'];
    });
  }

}
