import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { SongsService } from 'src/app/services/songs.service';
import { Comment } from 'src/app/interfaces/comment.interface'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent  implements OnInit {

  @Input()
  songId: string | undefined;
  author: string | undefined;
  commentText: string | undefined;
  stars: number = 0;
  comments: Comment[] | undefined;
  hideDelete: boolean = true;

  constructor(private songService: SongsService, private alertController: AlertController, private authService: AuthService, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.getComments();
    this.authService.isLogged().subscribe(loggedIn => {
      this.hideDelete = loggedIn;
      // Realiza cualquier acción adicional que necesites al cambiar el estado de autenticación
    });
  }

  async sendComment() {
    if (this.songId && this.author && this.commentText) {
      let comment: Comment = {
        _id: '',
        author: this.author,
        commentText: this.commentText,
        stars: this.stars,
        authorId: await this.authService.getUser(),
        geolocation: [0,0],
        date: new Date().toISOString()
      }

      let res = await this.songService.commentToSong(comment, this.songId);
      console.log(res);
      
      if (res.length > 0) {
        this.getComments();
        this.author = undefined;
        this.commentText = undefined;
        this.stars = 0;
        await this.presentToast('bottom', 'Comment added successfully');
      } else {
        await this.presentToast('bottom', 'Error adding comment');
      }

    }
  }


  async getComments() {
    console.log(this.songId);
    
    if (!this.songId) return;
    this.comments = await this.songService.getComments(this.songId);
    console.log(this.comments);
    
  }

  async deleteComment(commentId: string) {
    if (!this.songId) return;
    const response = await this.songService.deleteComment(this.songId, commentId);
    if (response){
      this.getComments();
      await this.presentToast('bottom', 'Comment deleted successfully');
    } 
  }

  handleDeleteAlert(commentId: string) {
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
            this.deleteComment(commentId);
          }
        },
      ]
    }).then(alert => alert.present());
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
