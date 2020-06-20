import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'listciud',
    pathMatch: 'full'
  },
  {
    path: 'listciud',
    loadChildren: () => import('./ciudad/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./ciudad/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./ciudad/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'listcli',
    loadChildren: () => import('./cliente/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./cliente/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./cliente/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'listdir',
    loadChildren: () => import('./direccion_envio/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./direccion_envio/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./direccion_envio/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'listarti',
    loadChildren: () => import('./articulo/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./articulo/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./articulo/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'listpedi',
    loadChildren: () => import('./pedido/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./pedido/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./pedido/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'listloca',
    loadChildren: () => import('./locacion/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./locacion/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./locacion/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'show',
    loadChildren: () => import('./ciudad/show/show.module').then( m => m.ShowPageModule)
  },
  {
    path: 'show',
    loadChildren: () => import('./cliente/show/show.module').then( m => m.ShowPageModule)
  },
  {
    path: 'show',
    loadChildren: () => import('./direccion_envio/show/show.module').then( m => m.ShowPageModule)
  },
  {
    path: 'show',
    loadChildren: () => import('./articulo/show/show.module').then( m => m.ShowPageModule)
  },
  {
    path: 'show',
    loadChildren: () => import('./pedido/show/show.module').then( m => m.ShowPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
