import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { createWiresService } from 'selenium-webdriver/firefox';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';
import { AppUser } from '../../models/app.user';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';



@Injectable()
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  )
  // tslint:disable-next-line:one-line
  {
    this.$user = this.afAuth.authState;
  }

  $user: Observable<firebase.User>;

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(user => {
        this.userService.save(user.user);
        this.router.navigate([returnUrl]);
      }
      );
  }

  get appUser$(): Observable<AppUser> {
    return this.$user
      .switchMap(
      (user, index) => {
        if (user) {
          return this.userService.get(user.uid);
        }

        return Observable.of(null);
      }
      );
  }
}
