import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/interfaces/song.interface';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {

  constructor(private songService: SongsService) { }

  songs: Song[] = [];

  async ngOnInit() {

    this.songs = await this.songService.getSongs();

  }

}
