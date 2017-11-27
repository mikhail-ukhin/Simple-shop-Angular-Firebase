import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  get(prodictId) {
    return this.db.object('/products/' + prodictId).snapshotChanges().map(action => {
      return { $key: action.key, ...action.payload.val() };
    });
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('products/' + productId).remove();
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
