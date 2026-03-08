import { Routes } from '@angular/router';
import { ProductForm } from './components/product-form/product-form';
import { ProductListComponent } from './components/product-list/product-list';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductForm },
  { path: 'products/edit/:id', component: ProductForm },
];
