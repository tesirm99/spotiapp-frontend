import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { Song } from 'src/app/interfaces/song.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {

  constructor(private songService: SongsService, private router: Router) { }

  songs: Song[] = [];

  async ngOnInit() {

    this.songs = await this.songService.getSongs();
    console.log(this.songs[0]);
    
  }

  goToSongDetail(id: string) {
    console.log('ID:', id);
    this.router.navigate(['/tabs/tab1/details', id]);
  }

}
