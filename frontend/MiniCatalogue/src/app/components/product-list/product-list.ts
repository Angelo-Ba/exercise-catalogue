import { Component, OnInit, signal, effect, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  products = signal<Product[]>([]);
  total = signal(0);
  loading = signal(false);
  error = signal<string | null>(null);

  search = signal('');
  categoryId = signal<number | null>(null);
  page = signal(1);

  constructor() {
    // Ogni volta che i filtri cambiano, ricarica i dati
    effect(
      () => {
        this.loadProducts();
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit() {}

  loadProducts() {
    this.loading.set(true);
    this.error.set(null);

    const params = {
      search: this.search(),
      categoryId: this.categoryId(),
      page: this.page(),
      limit: 10,
    };

    this.productService.getProducts(params).subscribe({
      next: (res) => {
        this.products.set(res.items);
        this.total.set(res.pagination.totalRecords);
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
}
