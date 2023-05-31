import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { Song } from 'src/app/interfaces/song.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {

  constructor(private songService: SongsService) { }

  songs: Song[] = [];

  async ngOnInit() {

    this.songs = await this.songService.getSongs();

  }

}
