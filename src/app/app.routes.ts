import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    // Carga perezosa (Lazy load) del componente Standalone
    loadComponent: () => import('./features/auth/login/login')
      .then(m => m.LoginComponent)
  },
  {
    path: 'documents/dashboard',
    loadComponent: () => import('./features/documents/pages/document-dashboard/document-dashboard')
      .then(m => m.DashboardComponent),
    canActivate: [authGuard] // Protege esta ruta
  },
  {
    // Wildcard: cualquier ruta no encontrada redirige al login
    path: '**',
    redirectTo: 'login'
  }
];
