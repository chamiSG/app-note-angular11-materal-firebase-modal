import { Component, OnInit } from '@angular/core';
import { User } from "./shared/services/user";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { AuthService } from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'postborad';

  constructor(
    public authService: AuthService,
  ) { 
  }

  ngOnInit(): void {
  }
}
