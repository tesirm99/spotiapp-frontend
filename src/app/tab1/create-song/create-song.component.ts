import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/interfaces/song.interface';
import { SongsService } from 'src/app/services/songs.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss'],
})
export class CreateSongComponent  implements OnInit {

  song: Song = {
    name: '',
    artist: '',
    album: '',
    releaseDate: 0,
    genre: '',
    duration: 0,
    image: '',
    href: '',
    popularity: 0,
    geolocation: [0, 0],
    comments: []
  };

  formValidation: FormGroup | undefined; 
  errorMessage: string = ''; 

  formValidationMessages = { 
   'name': [
     { type: 'required', message: 'The songs name is mandatory.' },
   ],
   'artist': [
     { type: 'required', message: 'The artist is required.' },
   ],
    'album': [
      { type: 'required', message: 'The album is required.' },
    ],
    'releaseDate': [
      { type: 'required', message: 'The release date is required.' },
    ],
    'genre': [
      { type: 'required', message: 'The genre is required.' },
    ],
    'duration': [
      { type: 'required', message: 'The duration is required.' },
    ],
    'image': [
      { type: 'required', message: 'The image is required.' },
    ],
    'href': [
      { type: 'required', message: 'The href is required.' },
    ],
    'popularity': [
      { type: 'required', message: 'The popularity is required.' },
    ],

 };

  constructor(private songService: SongsService, private formBuilder: FormBuilder, private router: Router) { }


  ngOnInit() {
    this.formValidation = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      artist: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      album: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      releaseDate: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      genre: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      duration: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      image: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      href: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      popularity: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  async insertarCancion() {
    // Realiza una solicitud POST a la API para insertar la canción
    console.log('Insertar canción:', this.song, this.formValidation);
    let res = await this.songService.createSong(this.song);

    console.log('Insertar canción:', res);
    this.router.navigate(['/tabs/tab1']);
  }
}

