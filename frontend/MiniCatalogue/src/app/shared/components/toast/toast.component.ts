import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (toast.message()) {
      <div class="toast-container" [class]="toast.type()">
        {{ toast.message() }}
      </div>
    }
  `,
  styles: [
    `
      .toast-container {
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .success {
        background-color: #22c55e;
      }
      .error {
        background-color: #ef4444;
      }
      @keyframes slideIn {
        from {
          transform: translateX(100%);
        }
        to {
          transform: translateX(0);
        }
      }
    `,
  ],
})
export class ToastComponent {
  toast = inject(ToastService);
}
