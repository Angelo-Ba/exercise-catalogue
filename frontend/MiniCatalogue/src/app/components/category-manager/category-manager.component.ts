import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { ToastService } from '../../shared/service/toast.service';
import { ERROR_MAPPING } from '../../shared/util/error-message';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-manager.component.html',
  styleUrl: './category-manager.component.scss',
})
export class CategoryManagerComponent implements OnInit {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private toast = inject(ToastService);

  categoryForm: FormGroup;
  categories = signal<Category[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading.set(true);
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.toast.show('Errore caricamento categorie', 'error');
        this.loading.set(false);
      },
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.categoryService.createCategory(this.categoryForm.value.name).subscribe({
      next: (newCat) => {
        this.loading.set(false);
        this.categories.update((prev) => [...prev, newCat]);
        this.categoryForm.reset();
        this.toast.show('Categoria creata con successo!');
      },
      error: (err) => {
        this.loading.set(false);
        const raw = err.error?.message || 'Errore imprevisto';
        this.error.set(ERROR_MAPPING[String(raw).toUpperCase()] || raw);
        this.toast.show(this.error()!, 'error');
      },
    });
  }
}
