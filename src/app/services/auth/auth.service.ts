import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { createWiresService } from 'selenium-webdriver/firefox';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router, private userService: UserService) {
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
}
