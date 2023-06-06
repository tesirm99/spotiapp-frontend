import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from 'src/app/interfaces/song.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SongsService } from 'src/app/services/songs.service';
import { Comment } from '../../interfaces/comment.interface';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent  implements OnInit {

  song!: Song;

  rating: number = 0;
  commentText: string = "";
  author: string = "";

  constructor(private songService: SongsService, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) { }

  async ngOnInit() {
    this.song = await this.songService.getSongById(this.activatedRoute.snapshot.paramMap.get('id')!);

  }

  async submitForm(){
    const date = new Date();

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son base 0, por eso se suma 1
    const year = date.getFullYear().toString();
    
    let newComment: Comment = {
      author: '',
      commentText: '',
      date: '',
      stars: 0,
      geolocation: [0, 0],
      authorId: ''
    };
    newComment.commentText = this.commentText;
    newComment.stars = this.rating;
    newComment.author = this.author;
    newComment.date = `${day}/${month}/${year}`;
  
    console.log(newComment);
    let res = await this.songService.commentToSong(newComment, this.song._id!);

    console.log(res);
    this.router.navigate(['/tabs/tab1/details', this.song._id]);
  }

}
