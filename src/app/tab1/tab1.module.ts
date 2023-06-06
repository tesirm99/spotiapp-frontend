import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ListComponent } from './list/list.component';
import { CreateSongComponent } from './create-song/create-song.component';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page, ListComponent, CreateSongComponent, SongDetailComponent, CreateCommentComponent, CommentsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1PageModule {}
