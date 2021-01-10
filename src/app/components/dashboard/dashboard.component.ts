import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from "../../shared/services/auth.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../../app.component';
import { ModalComponent } from '../modal/modal.component';
import { Note } from '../../models/note';
import { DatePipe } from '@angular/common';
import { NoteService } from 'src/app/shared/services/note.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  focus: any;
  focus1: any;
  
  content: string;

  noteData = new Note();
  formTitle = 'Add';

  constructor(
    public authService: AuthService,
    private datePipe: DatePipe,
    private noteService: NoteService
    ) {
  }

  note: Note = new Note();
  submitted = false;

  notes?: Note[];
  currentNote?: Note;
  currentIndex = -1;

  message = '';

  ngOnInit(): void {
    this.retrieveNotes();
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentNote = { ...this.updateNote };
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

  removeAllNotes(): void {
    this.noteService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }


  //Save Note//
  saveNote(): void {
    this.note.createdDate = this.datePipe.transform(Date.now(), 'MM-dd-yyyy HH:mm');
    this.noteService.create(this.note).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newNote(): void {
    this.submitted = false;
    this.note = new Note();
  }

  updateCurrentNote(): void {
    const data = {
      content: this.currentNote.content,
      createdDate: this.datePipe.transform(Date.now(), 'MM-dd-yyyy HH:mm')
    };

    if (this.currentNote.key) {
      this.noteService.update(this.currentNote.key, data)
        .then(() => this.message = 'The Note was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteCurrentNote(): void {
    console.log(this.currentNote);
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
