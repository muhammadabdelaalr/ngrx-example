import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from './store/actions/counter.action';
import { AppState } from './store/app.state';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ApisService } from './core/apis.service';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Category, Product } from './core/interface/interface';
import { selectProduct } from './store/selectors/products.selector';
import { addProduct, deleteProduct, editProduct, loadProducts } from './store/actions/products.action';
import { loadCategories } from './store/actions/categories.action';
import { selectCategories } from './store/selectors/categories.selector';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AsyncPipe, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private store = inject(Store<AppState>);
  private api = inject(ApisService);

  private destroy = new Subject<void>();

  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;

  isEdit: boolean = false;

  id = '';

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

  loadCategories() {
    this.api.getCategories().pipe(takeUntil(this.destroy)).subscribe((categories: Category[]) => {
      this.store.dispatch(loadCategories({ categories }));
    })
  }

  loadProducts() {
    this.api.getProducts().pipe(takeUntil(this.destroy)).subscribe((products: Product[]) => {
      this.store.dispatch(loadProducts({ products }));
    })
  }
  addProduct() {
    if (this.createForm.valid) {
      this.api.addProduct(this.createForm.value).pipe(takeUntil(this.destroy)).subscribe((product: Product) => {
        this.store.dispatch(addProduct({ product }));
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
      this.store.dispatch(editProduct( product ));
      this.id = '';
      this.createForm.reset();
    })
  }

  deleteProduct(product: Product) {
    const id = product.id || '';
    this.api.deleteProduct(id).pipe(takeUntil(this.destroy)).subscribe(() => {
      this.store.dispatch(deleteProduct(id));
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
