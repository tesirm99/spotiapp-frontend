import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from 'src/app/interfaces/song.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SongsService } from 'src/app/services/songs.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {

  constructor(private songService: SongsService, private authService: AuthService, private router: Router, private toastController: ToastController) { }
  
  tipoBusqueda: string = 'nombre';
  terminoBusqueda: string = '';
  textoPatata: string = 'Search for a song!'
  isLogged: boolean = false;
  songs: Song[] = [];
  selectedSongs = new Map<Song, Boolean>();
  sentSongs: number = 0;

  async ngOnInit() {

    this.authService.isLogged().subscribe(loggedIn => {
      this.isLogged = loggedIn;
      // Realiza cualquier acción adicional que necesites al cambiar el estado de autenticación
    });

  }

  resetTerminoBusqueda() {
    this.terminoBusqueda = ''; // Restablecer el término de búsqueda
  }

  buscar() {
    // Ejecutar la búsqueda según el tipo seleccionado
    if (this.tipoBusqueda === 'nombre') {
      this.buscarPorNombre();
    } else if (this.tipoBusqueda === 'artista') {
      this.buscarPorArtista();
    } else if (this.tipoBusqueda === 'fecha') {
      this.buscarPorFecha();
    } else if(this.tipoBusqueda === 'spotify') {
      this.buscarPorSpotify();
    }
  }

  buscarPorNombre() {
    // Lógica de búsqueda por nombre
    console.log('Búsqueda por nombre:', this.terminoBusqueda);
    this.songService.searchSongByName(this.terminoBusqueda).subscribe(
      (data: any) => {
        if(data.length == 0) {
          this.textoPatata = 'No results found :(';
        }
        this.songs = data;
        
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  buscarPorArtista() {
    // Lógica de búsqueda por artista
    console.log('Búsqueda por artista:', this.terminoBusqueda);
    this.songService.searchSongByArtist(this.terminoBusqueda).subscribe(
      (data: any) => {
        if(data.length == 0) {
          this.textoPatata = 'No results found :(';
        }
        console.log(data);
        this.songs = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  buscarPorFecha() {
    // Lógica de búsqueda por fecha
    console.log('Búsqueda por fecha:', this.terminoBusqueda);
    this.songService.searchSongByDate(this.terminoBusqueda).subscribe(
      (data: any) => {
        if(data.length == 0) {
          this.textoPatata = 'No results found :(';
        }
        console.log(data);
        this.songs = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  buscarPorSpotify() {
    // Lógica de búsqueda por fecha
    console.log('Búsqueda por spotify:', this.terminoBusqueda);
    this.songService.searchSongFromSpotify(this.terminoBusqueda).subscribe(
      (data: any) => {
        console.log(data.tracks.items);
        
        data.tracks.items.forEach((element: any) => {
          let song: Song = {
            name: element.name,
            artist: element.artists[0].name,
            album: element.album.name,
            releaseDate: element.album.release_date,
            duration: element.duration_ms / (1000 * 60),
            href: element.external_urls.spotify,
            image: element.album.images[2].url,
            genre: "Genre not available",
            popularity: element.popularity,
            geolocation: [0, 0],
            comments: []
          }
          this.songs.push(song);
        });
        console.log(this.songs);
        console.log(this.songs[0].image);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  selectSong(song: Song) {
    this.selectedSongs!.set(song, !this.selectedSongs!.get(song));
  }

  async addSelectedSongs() {
    const toast = await this.toastController.create({
      message: 'Song(s) added successfully!',
      duration: 2000
    });
    const selectedSongs = this.songs.filter(song => this.selectedSongs!.get(song));
    selectedSongs.forEach(song => {
      console.log(song);
      
      this.songService.createSong(song).then(
        (data: any) => {
          console.log(data);
          this.sentSongs++;
          if(this.sentSongs == selectedSongs.length) {
            this.selectedSongs = new Map<Song, Boolean>();
            this.sentSongs = 0;
            this.songs = [];
            toast.present();
            this.router.navigate(['/tabs/tab1']);
          }
        })
        .catch(
        (error: any) => {
          toast.message = 'Error adding songs!';
          toast.present();
          console.log(error);
        }
      );
    });

  }

  areSongsSelected(): boolean {
    return Array.from(this.selectedSongs!.values()).some(value => value);
  }

  goToSongDetail(id: string) {
    console.log(id);
    this.router.navigate(['/tabs/tab1/details', id]);
  }

}
