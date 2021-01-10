import { Injectable } from '@angular/core';
import { Note } from '../../models/Note';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private dbPath = '/note';

  notesRef: AngularFireList<Note>;    // Reference to Student data list, its an Observable
  noteRef: AngularFireObject<Note>;

  constructor(private db: AngularFireDatabase) { 
    this.notesRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Note> {
    return this.notesRef;
  }

  create(note: Note): any {
    return this.notesRef.push(note);
  }

  update(key: string, value: any): Promise<void> {
    return this.notesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.notesRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.notesRef.remove();
  }

}
