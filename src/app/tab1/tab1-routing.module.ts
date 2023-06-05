import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { CreateSongComponent } from './create-song/create-song.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'insertSong',
    component: CreateSongComponent
  },
  {
    path: 'details/:id',
    component: SongDetailComponent
  },
  {
    path: 'createComment/:id',
    component: CreateCommentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
