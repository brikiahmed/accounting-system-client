import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {Globals} from '../_globals/Globals';
import {HttpClient} from '@angular/common/http';
import {AuthTokenModel} from '../_models/auth-token.model';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<AuthTokenModel>;
  public currentUser: Observable<AuthTokenModel>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<AuthTokenModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthTokenModel {
    return this.currentUserSubject.value;
  }

  login(value) {
    return this.http.post<any>(Globals.apiUrl + Globals.login, value)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    console.log('logout');
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    console.log('logout 1')
    this.router.navigate(['/auth/login']);
  }
}
