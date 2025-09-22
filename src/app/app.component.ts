import { Component, OnInit } from '@angular/core';
import { AuthService } from './infrastructure/auth/auth.service';
import { UserService } from './user/user.service';
import { LayoutModule } from "./layout/layout.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'WeeklyBite';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.userService.init(this.authService);

    this.authService.userRole$.subscribe(role => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }

}