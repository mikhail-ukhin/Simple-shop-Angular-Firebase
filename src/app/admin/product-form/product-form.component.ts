import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/app.category';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';
import { ProductService } from '../../services/product/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/app.product';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;
  product: Product = this.product = new Product('', 0, '', '');
  productId: string;

  constructor
    (
    private categoryService: CategoryService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.categories$ = this.categoryService.getCategories();
    this.toastr.setRootViewContainerRef(vcr);
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.productService.get(this.productId)
        .take(1)
        .subscribe(product => {
          this.product = product;
        });
    }
  }

  ngOnInit() {
  }

  save(product) {

    if (this.productId) {
      this.productService.update(this.productId, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Удалить продукт?')) {
      this.productService.delete(this.productId);
      this.router.navigate(['/admin/products']);
    }
  }



}
