import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {User} from './user';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  userIsSignOut: boolean;
  currentUser: User;
  signInForm;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.getCurrentUser();
    this.userIsSignOut = false;
  }

  getCurrentUser(): any {
    this.authService.getCurrentUser().subscribe(user => {
        this.currentUser = user;
      },
      error1 => {
        this.authService.showPopUp(error1);
      }
    );
  }

  signOut() {
    this.authService.signOut(this.currentUser);
  }

  signIn() {
    this.authService.signIn(this.currentUser);
  }
}
