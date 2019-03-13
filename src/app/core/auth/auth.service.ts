import {Injectable} from '@angular/core';
import {User} from './user';
import {Observable} from 'rxjs';
import {throwError} from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private appUsers: Array<User>;

  constructor() {
    this.getUsers();
  }

  signUp(user: User) {
    this.addUser(user);
  }

  signIn(user: User) {
    this.verifyUser(user);
  }


  signOut(user: User): void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): Observable<User> {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser'));
    } else {
      return throwError(`user isn't loggedIn`);
    }
  }

  public showPopUp(message: string) {
    console.log(message);
  }

  private getUsers(): void {
    this.appUsers = JSON.parse(localStorage.getItem('usersList'));
  }

  private addUser(user: User): void {
    if (this.appUsers.length && this.appUsers.find((appUser) => user.username === appUser.username)) {
      this.showPopUp('Такой пользователь уже создан');
      return;
    }
    this.appUsers.push(user);
    localStorage.setItem('usersList', JSON.stringify(this.appUsers));
  }

  private verifyUser(user: User): boolean {
    if (this.appUsers.length && this.appUsers.find((appUser) => user.username === appUser.username)) {
      this.appUsers.find((appUser) => {
        if (user.username === appUser.username && user.password === appUser.password) {
          localStorage.setItem('currentUser', JSON.stringify(user));
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
