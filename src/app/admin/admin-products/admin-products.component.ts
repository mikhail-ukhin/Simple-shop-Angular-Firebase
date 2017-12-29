import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/app.product';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResourse: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe(products => {
        this.products = products;
        this.initializeTableResourse(products);
      });
  }


  filter(value: string) {
    const filteredProducts = value && value !== '' ?
      this.products.filter(product =>
        product.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())) :
      this.products;

      this.initializeTableResourse(filteredProducts);
  }

  reloadItems(params) {
    if (!this.tableResourse) {
      return;
    }

    this.tableResourse.query(params).then(items => this.items = items);
  }

  private initializeTableResourse(products: Product[]) {
    this.tableResourse = new DataTableResource(products);
    this.tableResourse.query({ offset: 0 }).then(items => this.items = items);
    this.tableResourse.count().then(count => this.itemCount = count);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
