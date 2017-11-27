import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/app.product';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe(products => {
        this.products = this.filteredProducts = products;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(value: string) {
    this.filteredProducts = value && value !== '' ?
      this.products.filter(product =>
        product.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())) :
      this.products;
  }

}
