import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from 'src/app/interfaces/song.interface';
import { SongsService } from 'src/app/services/songs.service';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss'],
})
export class SongDetailComponent  implements OnInit {

  song: Song | undefined;
  constructor(private songService: SongsService, private activatedRoute: ActivatedRoute, private router: Router) {

    this.activatedRoute.params.subscribe(async params => {
      if(params['id'] != undefined){
        this.song = await this.songService.getSongById(params['id']);
      }
    });
    

  }

  async ngOnInit() {
    //this.song = await this.songService.getSongById(this.activatedRoute.snapshot.paramMap.get('id')!);
  }

  addComment(){
    this.router.navigate(['tabs/tab1/createComment', this.song!._id]);
  }

}
