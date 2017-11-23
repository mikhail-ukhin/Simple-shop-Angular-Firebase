import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/app.category';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';

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
    private vcr: ViewContainerRef
  ) {
    this.categories$ = this.categoryService.getCategories();
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  save(product) {
    // console.log(product);
    this.toastr.success(`Поздравляю! Вы заказали ${product.title}`);
  }
}
