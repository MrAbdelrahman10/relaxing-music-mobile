import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'favorite',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../favorite/favorite.module').then(m => m.FavoritePageModule)
          }
        ]
      },
      {
        path: 'library',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../library/library.module').then(m => m.LibraryPageModule)
          }
        ]
      },
      {
        path: 'songs/:id/category',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../songs/songs.module').then(m => m.SongsPageModule)
          }
        ]
      },
      {
        path: 'song/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../song/song.module').then(m => m.SongPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/favorite',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/favorite',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
