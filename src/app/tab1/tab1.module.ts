import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ListComponent } from './list/list.component';
import { CreateSongComponent } from './create-song/create-song.component';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page, ListComponent, CreateSongComponent, SongDetailComponent, CreateCommentComponent]
})
export class Tab1PageModule {}
