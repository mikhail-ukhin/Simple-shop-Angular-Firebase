import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/app.category';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any>;
  constructor
  (
    private categoryService: CategoryService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private productService: ProductService
  ) {
    this.categories$ = this.categoryService.getCategories();
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  save(product) {
    this.productService.create(product);
    this.toastr.success('Продукт успешно добавлен!');
  }
}
