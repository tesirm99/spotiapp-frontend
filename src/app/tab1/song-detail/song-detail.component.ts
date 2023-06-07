import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from 'src/app/interfaces/song.interface';
import { SongsService } from 'src/app/services/songs.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss'],
})
export class SongDetailComponent  implements OnInit {

  song: Song | undefined;
  constructor(private songService: SongsService, private activatedRoute: ActivatedRoute, private router: Router, private alertController: AlertController) {

    this.activatedRoute.params.subscribe(async params => {
      if(params['id'] != undefined){
        this.song = await this.songService.getSongById(params['id']);
      }
    });
    

  }

  async ngOnInit() {
    //this.song = await this.songService.getSongById(this.activatedRoute.snapshot.paramMap.get('id')!);
  }

  handleDeleteAlert(songId: string) {
    this.alertController.create({
      header: 'Confirm delete',
      message: 'Are you sure you want to delete this comment?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'confirm',
          handler: () => {
            this.deleteSong(songId);
          }
        },
      ]
    }).then(alert => alert.present());
  }

  async deleteSong(songId: string) {
    let res = await this.songService.deleteSong(songId);
    if (res) {
      this.router.navigate(['tabs/tab1']);
    }
  }
}
