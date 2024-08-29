import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../../../../store/actions/counter.action';
import { AppState } from '../../../../store/app.state';
import { ApisService } from '../../../../core/services/apis.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Category } from '../../../../core/interface/interface';
import { selectIsEdit, selectProduct } from '../../store/products.selector';
import * as productsActions from '../../store/products.action';
import * as categoriesActions from '../../../../store/actions/categories.action';
import { selectCategories } from '../../../../store/selectors/categories.selector';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../../../core/services/http.service';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { Product } from '../../interfaces/products.interface';

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
export class ProductsComponent {
  private store = inject(Store<AppState>);
  private api = inject(ApisService);
  private _http = inject(HttpService);

  platformId = inject(PLATFORM_ID);

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
    if(this.platformId === 'browser') {
      this.initForm();
      this.loadCategories();
      this.loadProducts();
      this.isEditFn();
    }
  }

  isEditFn() {
    this.store.select(selectIsEdit).pipe(takeUntil(this.destroy)).subscribe({
      next: (res) => {
        this.isEdit = res;
      },
    })
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

  selectProductForEdit(product: Product) {
    if (product) {
      this.store.dispatch(productsActions.selectProductForEdit( product ));
      this.id = product.id ? product.id : '';
      this.createForm.patchValue(product);
    }
  }

  editProduct() {
    // this.isEdit = false;
    const product = { id: this.id, ...this.createForm.value };
    this.store.dispatch(productsActions.editProduct( product ));
    this.id = '';
    this.createForm.reset();
    // this.api.editProduct(this.id, this.createForm.value).pipe(takeUntil(this.destroy)).subscribe(() => {
    // })
  }

  deleteProduct(product: Product) {
    const id = product.id || '';
    this.store.dispatch(productsActions.loadProducts());
    // this.api.deleteProduct(id).pipe(takeUntil(this.destroy)).subscribe(() => {
    // });
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
