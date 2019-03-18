import {Injectable} from '@angular/core';
import {User} from './user';
import {BehaviorSubject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private appUsers: Array<User>;
  currentUser = new BehaviorSubject<string>(undefined);

  constructor(private snackBar: MatSnackBar) {
    this.getUsers();
  }

  signUp(user: User) {
    this.addUser(user);
  }

  signIn(user: User) {
    this.verifyUser(user);
  }


  signOut(): void {
    localStorage.removeItem('currentUser');
    this.currentUser.next(undefined);
  }

  getCurrentUser(): void {
    if (localStorage.getItem('currentUser')) {
      this.currentUser.next(localStorage.getItem('currentUser'));
    }
  }

  public showPopUp(message: string) {
    this.snackBar.open(message, `Ok`, {
      duration: 1500,
      verticalPosition: 'top'
    });
  }

  private getUsers(): void {
    this.appUsers = JSON.parse(localStorage.getItem('usersList')) || [];
  }

  private addUser(user: User): void {
    if (this.appUsers.length && this.appUsers.find((appUser) => user.username === appUser.username)) {
      this.showPopUp('Такой пользователь уже создан');
      return;
    }
    this.appUsers.push(user);
    localStorage.setItem('usersList', JSON.stringify(this.appUsers));
    localStorage.setItem('currentUser', user.username);
    this.currentUser.next(localStorage.getItem('currentUser'));
  }

  private verifyUser(user: User): boolean {
    if (this.appUsers.length && this.appUsers.find((appUser) => user.username === appUser.username)) {
      this.appUsers.find((appUser) => {
        if (user.username === appUser.username && user.password === appUser.password) {
          localStorage.setItem('currentUser', user.username);
          this.currentUser.next(localStorage.getItem('currentUser'));
          return true;
        } else {
          this.showPopUp('Пароль пользователя не корректен');
          return false;
        }
      });
    } else {
      this.showPopUp('Такого пользователя не существует');
      return false;
    }
  }
}
