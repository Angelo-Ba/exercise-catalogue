import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  message = signal<string | null>(null);
  type = signal<'success' | 'error'>('success');

  show(msg: string, type: 'success' | 'error' = 'success') {
    setTimeout(() => {
      this.message.set(msg);
      this.type.set(type);
    }, 10);

    // Auto-chiusura dopo 3 secondi
    setTimeout(() => this.message.set(null), 3000);
  }
}
