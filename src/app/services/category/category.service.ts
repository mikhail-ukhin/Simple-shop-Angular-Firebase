import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../models/app.category';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  public getAll() {
    return this.db
      .list('/categories', ref => ref
      .orderByChild('name'))
      .snapshotChanges();
  }
}
