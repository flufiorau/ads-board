import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  userIsSignOut: boolean;
  currentUser: string;
  signInForm: FormGroup;
  signUpForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.signInForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.authService.currentUser.subscribe((user: string) => {
        this.currentUser = user;
        this.userIsSignOut = false;
      }
    );
  }

  getCurrentUser(): any {
    this.authService.getCurrentUser();
  }

  signOut() {
    this.authService.signOut();
    this.signInForm.reset();
  }

  signIn() {
    this.authService.signIn(this.signInForm.value);
  }

  createAd() {
    this.router.navigateByUrl(`edit`);
  }
}
