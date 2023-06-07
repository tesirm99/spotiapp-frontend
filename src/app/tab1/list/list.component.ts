import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { Song } from 'src/app/interfaces/song.interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {

  isLogged: boolean = false;

  constructor(private songService: SongsService, private router: Router, private authService: AuthService, private alertController: AlertController) { 
    
  }


  songs: Song[] = [];

  async ngOnInit() {

    this.songs = await this.songService.getSongs();
    console.log(this.songs[0]);
    
    this.authService.isLogged().subscribe(loggedIn => {
      this.isLogged = loggedIn;
      console.log('Logged in:', this.isLogged);
      
      // Realiza cualquier acción adicional que necesites al cambiar el estado de autenticación
    });
  }

  goToSongDetail(id: string) {
    console.log('ID:', id);
    this.router.navigate(['/tabs/tab1/details', id]);
  }

  async deleteSong(song: Song) {
    let res = await this.songService.deleteSong(song._id!);
    if (res) {
      this.songs = await this.songService.getSongs();
    }
  }

  handleDeleteAlert(song: Song) {
    this.alertController.create({
      header: 'Delete song',
      message: 'Are you sure you want to delete this song?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deleteSong(song);
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    }).then(alert => alert.present());

  }

}
