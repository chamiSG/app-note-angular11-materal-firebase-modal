import { Component, OnInit } from '@angular/core';
import { AuthService } from "./shared/services/auth.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'postborad';

  isLoggedIn$: Observable<boolean>;
  email: string;
  constructor(
    public authService: AuthService,
  ) { 
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.email  =this.authService.email();
  }

  onLogout() {
    this.authService.SignOut();
  }
}
