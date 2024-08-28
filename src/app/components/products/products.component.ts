import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../../store/actions/counter.action';
import { AppState } from '../../store/app.state';
import { ApisService } from '../../core/services/apis.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Category, Product } from '../../core/interface/interface';
import { selectProduct } from '../../store/selectors/products.selector';
import * as productsActions from '../../store/actions/products.action';
import * as categoriesActions from '../../store/actions/categories.action';
import { selectCategories } from '../../store/selectors/categories.selector';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../core/services/http.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [
    HttpService
  ],
})
export class ProductsComponent implements OnInit {
  private store = inject(Store<AppState>);
  private api = inject(ApisService);
  private _http = inject(HttpService);

  private destroy = new Subject<void>();

  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;

  isEdit: boolean = false;

  private id = '';

  count$ = this.store.select('counter');


  createForm: FormGroup = new FormGroup({});

  constructor() {
    this.categories$ = this.store.select(selectCategories);
    this.products$ = this.store.select(selectProduct);

  }

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.loadProducts();
  }

  initForm(): void {
    const images = [
      'https://picsum.photos/300/200',
      'https://picsum.photos/90/50',
      'https://picsum.photos/100/80',
    ]
    const randomImage = images[Math.floor(Math.random() * images.length)];
    this.createForm = new FormGroup({
      name: new FormControl('item ', Validators.required),
      desc: new FormControl('desc', Validators.required),
      category: new FormControl('', Validators.required),
      img: new FormControl(randomImage, Validators.required),
    })
  }

reqStatus(status: number) {
  this._http.getStatus(status).pipe(takeUntil(this.destroy)).subscribe({
    next: (res) => {},
    error: (err) => {},
    complete: () => {}
  });
}

  loadCategories() {
    this.store.dispatch(categoriesActions.loadCategories())
  }

  loadProducts() {
    this.store.dispatch(productsActions.loadProducts());
  }
  addProduct() {
    if (this.createForm.valid) {
      this.api.addProduct(this.createForm.value).pipe(takeUntil(this.destroy)).subscribe((product: Product) => {
        this.store.dispatch(productsActions.loadProducts());
        this.createForm.reset();
      })
    }
  }

  setProduct(product: Product) {
    this.isEdit = true;
    if (product) {
      this.id = product.id ? product.id : '';
      this.createForm.patchValue(product);
    }
  }

  editProduct() {
    this.api.editProduct(this.id, this.createForm.value).pipe(takeUntil(this.destroy)).subscribe(() => {
      this.isEdit = false;
      const product = { id: this.id, ...this.createForm.value };
      this.store.dispatch(productsActions.editProduct( product ));
      this.id = '';
      this.createForm.reset();
    })
  }

  deleteProduct(product: Product) {
    const id = product.id || '';
    this.api.deleteProduct(id).pipe(takeUntil(this.destroy)).subscribe(() => {
      this.store.dispatch(productsActions.loadProducts());
    });
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
