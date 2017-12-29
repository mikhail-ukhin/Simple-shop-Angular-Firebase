import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { Product } from '../models/app.product';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$;
  categories$;

  constructor(productService: ProductService, categoryService: CategoryService) {
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getAll();
  }
}
