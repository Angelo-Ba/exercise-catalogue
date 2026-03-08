import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  productForm: FormGroup;
  categories = signal<Category[]>([]);
  isEditMode = signal(false);
  productId = signal<number | null>(null);
  loading = signal(false);

  constructor() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]], // Validazione prezzo >= 0
      categoryId: [],
      tags: [[]], // Gestibile come stringa separata da virgole per semplicità
    });
  }

  ngOnInit() {
    // Carica categorie per la select
    this.categoryService.getCategories().subscribe((cats) => this.categories.set(cats));

    // Controlla se siamo in Edit (es. /products/edit/12)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.productId.set(Number(id));
      this.loadProductForEdit(Number(id));
    }
  }

  loadProductForEdit(id: number) {
    this.productService.getProductById(id).subscribe((product) => {
      console.log('Dati ricevuti nel componente:', product);

      if (!product) {
        console.error('Il prodotto è undefined!');
        return;
      }

      this.productForm.patchValue({
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
        tags: Array.isArray(product.tags) ? product.tags.join(', ') : product.tags || '',
      });
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    this.loading.set(true);
    const formValue = this.productForm.value;

    // Trasforma la stringa "elettronica, nuovo" in array ["elettronica", "nuovo"]
    const productData = {
      ...formValue,
      categoryId: formValue.categoryId ? Number(formValue.categoryId) : null,
      tags:
        typeof formValue.tags === 'string'
          ? formValue.tags
              .split(',')
              .map((t: string) => t.trim())
              .filter((t: string) => t !== '')
          : formValue.tags,
    };

    const request = this.isEditMode()
      ? this.productService.updateProduct(this.productId()!, productData)
      : this.productService.createProduct(productData);

    request.subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.loading.set(false);
        console.error('Errore durante il salvataggio', err);
      },
    });
  }
}
