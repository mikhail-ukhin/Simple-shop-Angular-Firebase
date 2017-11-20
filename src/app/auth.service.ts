import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { createWiresService } from 'selenium-webdriver/firefox';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
    this.$user = this.afAuth.authState;
  }

  $user: Observable<firebase.User>;

  logout() {
    this.afAuth.auth.signOut();
  }

  login() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  getUserState() {
    return this.afAuth.authState;
  }
}
