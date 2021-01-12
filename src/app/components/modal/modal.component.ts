import { Component, OnInit, Input, Inject, OnChanges, Output, EventEmitter } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../../models/note';
import { DatePipe } from '@angular/common';
import { NoteService } from 'src/app/shared/services/note.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [DatePipe]

})
export class ModalComponent implements OnInit {

  @Input() updateNote?: Note;
  @Output() refreshLists: EventEmitter<any> = new EventEmitter();
  focus: any;
  focus1: any;
  note: Note = new Note();
  submitted = false;
  key: string;
  message = '';

  constructor(
    public authService: AuthService,
    private datePipe: DatePipe,
    public noteService: NoteService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note,
    ) {  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // this.notes = {};
    if(this.key){
      this.noteService.getData(this.key).valueChanges()
      .subscribe(data => {
        this.note = data;
      });
    }
  }

  //Save Note//
  saveNote(): void {
    const data = {
      author: this.note.author,
      content: this.note.content,
      createdDate: this.datePipe.transform(Date.now(), 'MM-dd-yyyy HH:mm')
    };
    if (this.key) {
      this.noteService.update(this.key, data)
        .then(() => {
          this.message = 'The Note was updated successfully!';
          console.log(this.message);
         })
        .catch(err => console.log(err));
    }else{
      this.note.author = this.note.author;
      this.note.createdDate = this.datePipe.transform(Date.now(), 'MM-dd-yyyy HH:mm');
      this.noteService.create(this.note).then(() => {
        console.log('Created new item successfully!');
        this.submitted = true;
      });
    }
  }
}
