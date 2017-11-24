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

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.get(id)
      .take(1)
      .subscribe(product => {
        this.product = product;
      });
    }
  }

  ngOnInit() {
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }



}
