  import { authGuard } from './core/auth.guard' 
  import { Routes } from '@angular/router';
  export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./features/home/home/home').then((m) => m.Home),
    },
    {
      path: 'produtos',
      loadComponent: () =>
        import('./features/produtos/lista-produtos/lista-produtos').then((m) => m.ListaProdutos),
    },
    {
      path: 'carrinho',
      canActivate: [authGuard],
      loadComponent: () => import('./features/carrinho/carrinho/carrinho').then((m) => m.Carrinho),
    },

    {
      path: '**',
      redirectTo: '',
    },
  ];