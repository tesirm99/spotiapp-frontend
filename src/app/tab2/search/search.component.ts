import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/interfaces/song.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {

  constructor(private songService: SongsService, private authService: AuthService) { }
  
  tipoBusqueda: string = 'nombre';
  terminoBusqueda: string = '';
  textoPatata: string = 'Search for a song!'
  isLogged: boolean = false;
  songs: Song[] = [];

  async ngOnInit() {

    this.isLogged = this.authService.isLogged();

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

}
