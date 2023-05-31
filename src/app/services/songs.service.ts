import { Injectable } from '@angular/core';
import { Song } from '../interfaces/song.interface';
import { Comment } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  songAPIURL = "http://localhost:3000/songs";

  constructor() { }

  async getSongs(): Promise<Song[]> {
    let res = await fetch(this.songAPIURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await res.json();
  }

  async getSongById(id: string): Promise<Song> {
    let res = await fetch(this.songAPIURL + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await res.json();
  }

  async createSong(song: any) {
    let res = await fetch(this.songAPIURL, {
      method: 'POST',
      body: JSON.stringify(song),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await res.json();
  }

  async updateSong(song: any) {
    let res = await fetch(this.songAPIURL + '/' + song._id, {
      method: 'PUT',
      body: JSON.stringify(song),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await res.json();
  }

  async deleteSong(id: string) {
    let res = await fetch(this.songAPIURL + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await res.json();
  }

  async searchSongFromSpotify(name: string): Promise<Song[]> {
    let res = await fetch(this.songAPIURL + '/fetchSongsFromSpotify/' + name, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await res.json();
  }

  async searchSongByName(name: string): Promise<Song[]> {
    let res = await fetch(this.songAPIURL + '/search/' + name, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await res.json();
  }

  async searchSongByArtist(artist: string): Promise<Song[]> {
    let res = await fetch(this.songAPIURL + '/searchByArtist/' + artist, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await res.json();
  }

  async searchSongByDate(date: string): Promise<Song[]> {
    let res = await fetch(this.songAPIURL + '/searchByDate/' + date, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await res.json();
  }



}
