import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Note } from '../../models/note';
import { DatePipe } from '@angular/common';
import { NoteService } from 'src/app/shared/services/note.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]

})
export class DashboardComponent implements OnInit {


  @Input() updateNote?: Note;
  @Output() refreshLists: EventEmitter<any> = new EventEmitter();
  @Output() keyEvent = new EventEmitter<string>();

  focus: any;
  focus1: any;
  author: string;
  content: string;
  noteData = new Note();
  note: Note = new Note();
  submitted = false;
  notes?: Note[];
  currentNote?: Note;
  currentIndex = -1;
  message = '';

  constructor(
    public authService: AuthService,
    private datePipe: DatePipe,
    private noteService: NoteService,
    public dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.retrieveNotes();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {author: this.author, content: this.content},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.content = result;
    });
  }
 
  editDialog(): void {
    let key = this.currentNote.key;

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.key = key;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.content = result;
    });
  }

  refreshList(): void {
    this.currentNote = undefined;
    this.currentIndex = -1;
    this.retrieveNotes();
  }

  retrieveNotes(): void {
    this.noteService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.notes = data;
    });
  }

  setActiveNote(note: Note, index: number): void {
    this.currentNote = note;
    this.currentIndex = index;
  }

  deleteCurrentNote(): void {
    if (this.currentNote.key) {
      this.noteService.delete(this.currentNote.key)
        .then(() => {
          this.refreshLists.emit();
          this.message = 'The Note was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}
