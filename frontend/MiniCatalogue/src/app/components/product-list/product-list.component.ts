import { Component, OnInit, signal, effect, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products = signal<Product[]>([]);
  total = signal(0);
  loading = signal(false);
  error = signal<string | null>(null);

  search = signal('');
  categoryId = signal<number | null>(null);
  page = signal(1);
  size = signal(10); // default a 10
  sort = signal<'price' | 'created_at'>('created_at');
  order = signal<'asc' | 'desc'>('desc');
  categories = signal<Category[]>([]);

  pagination = signal<{
    totalPages: number;
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
  } | null>(null);

  constructor() {
    // Ogni volta che i filtri cambiano, ricarica i dati
    effect(
      () => {
        this.loadProducts();
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit() {
    // Carica le categorie SOLO una volta all'avvio
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        console.log('Categorie caricate:', data); // Debug per il colloquio
        this.categories.set(data);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Errore nel caricamento categorie');
      },
    });
  }

  loadProducts() {
    this.loading.set(true);
    this.error.set(null);

    const params = {
      search: this.search(),
      categoryId: this.categoryId(),
      minPrice: null,
      maxPrice: null,
      sort: this.sort(),
      order: this.order(),
      page: this.page(),
      size: this.size(),
    };

    this.productService.getProducts(params).subscribe({
      next: (res) => {
        this.products.set(res.items);
        this.total.set(res.pagination.totalRecords);
        this.pagination.set(res.pagination);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Errore nel caricamento prodotti');
        this.loading.set(false);
      },
    });
  }

  // Metodi per UI
  updateSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.set(value);
    this.page.set(1); // Reset pagina alla ricerca
  }

  // Metodo per gestire il cambio categoria dalla select
  updateCategory(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.categoryId.set(value ? Number(value) : null);
    this.page.set(1); // Reset pagina al cambio filtro
  }

  goToPage(page: number | null) {
    if (page) {
      this.page.set(page); // L'effect() caricherà automaticamente i nuovi dati
    }
  }

  updateSize(newSize: number) {
    this.size.set(newSize);
    this.page.set(1);
  }

  onSizeChange(event: Event) {
    const newSize = Number((event.target as HTMLSelectElement).value);
    this.updateSize(newSize);
  }
}
