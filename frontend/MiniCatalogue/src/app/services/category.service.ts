import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Category } from '../models/category.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/categories`;

  getCategories(): Observable<Category[]> {
    return this.http
      .get<{ success: boolean; data: Category[] }>(this.apiUrl + '/list')
      .pipe(map((response) => response.data));
  }

  createCategory(name: string): Observable<Category> {
    return this.http
      .post<ApiResponse<Category>>(this.apiUrl, { name })
      .pipe(map((response) => response.data.data));
  }
}
