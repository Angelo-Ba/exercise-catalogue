import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="main-nav">
      <div class="nav-container">
        <div class="logo" routerLink="/">Mini Catalogue</div>
        <div class="tabs">
          <a
            routerLink="/products"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: false }"
          >
            Prodotti
          </a>
          <a routerLink="/categories" routerLinkActive="active"> Categorie </a>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .main-nav {
        background: #ffffff;
        border-bottom: 1px solid #e2e8f0;
        padding: 0 2rem;
        height: 64px;
        display: flex;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      .nav-container {
        max-width: 1100px;
        margin: 0 auto;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .logo {
        font-weight: 800;
        font-size: 1.2rem;
        color: #2563eb;
        cursor: pointer;
      }
      .tabs {
        display: flex;
        gap: 2rem;
        height: 64px;

        a {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: #64748b;
          font-weight: 600;
          font-size: 0.95rem;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;

          &:hover {
            color: #2563eb;
          }

          &.active {
            color: #2563eb;
            border-bottom: 2px solid #2563eb;
          }
        }
      }
    `,
  ],
})
export class NavbarComponent {}
