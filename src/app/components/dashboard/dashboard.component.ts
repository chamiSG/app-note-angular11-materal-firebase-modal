import { Component, OnInit, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../../app.component';
import { ModalComponent } from '../modal/modal.component';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  postTitle: string;
  content: string;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: {postTitle: this.postTitle, content: this.content}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.content = result;
    });
  }

  ngOnInit(): void {
  }

}
