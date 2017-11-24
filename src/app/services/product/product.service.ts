import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges().map(action => {
      return action.map(item => {
        const key = item.payload.key;
        return { $key: key, ...item.payload.val() };
      });
    });
  }
}
