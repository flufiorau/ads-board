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
  userWantDoSignUp = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.signInForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordRepeat: new FormControl('', [Validators.required])
    }, passwordMatchValidator);

    function passwordMatchValidator(g: FormGroup) {
      if (g.get('passwordRepeat').dirty) {
        if (g.get('password').value !== '') {
          return g.get('password').value === g.get('passwordRepeat').value ? null : {mismatch: true};
        }
      }
      return {mismatch: true};
    }

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

  signUp() {
    this.authService.signUp(this.signUpForm.value);
  }

  createAd() {
    this.router.navigateByUrl(`edit`);
  }
}
