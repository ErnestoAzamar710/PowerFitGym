import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'iniciar-sesion',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'admin-usuarios',
    loadChildren: () => import('./Administrador/admin-usuarios/admin-usuarios.module').then( m => m.AdminUsuariosPageModule)
  },
  {
    path: 'agregar-usuarios',
    loadChildren: () => import('./Administrador/agregar-usuarios/agregar-usuarios.module').then( m => m.AgregarUsuariosPageModule)
  },
  {
    path: 'pago-suscripcion',
    loadChildren: () => import('./Administrador/pago-suscripcion/pago-suscripcion.module').then( m => m.PagoSuscripcionPageModule)
  },
  {
    path: 'confirmar-pago/:uid',
    loadChildren: () => import('./Administrador/confirmar-pago/confirmar-pago.module').then( m => m.ConfirmarPagoPageModule)
  },
  {
    path: 'opciones-usuario/:uid',
    loadChildren: () => import('./Usuario/opciones-usuario/opciones-usuario.module').then( m => m.OpcionesUsuarioPageModule)
  },
  {
    path: 'ver-perfil/:uid',
    loadChildren: () => import('./Usuario/ver-perfil/ver-perfil.module').then( m => m.VerPerfilPageModule)
  },
  {
    path: 'generar-qr/:uid',
    loadChildren: () => import('./Usuario/generar-qr/generar-qr.module').then( m => m.GenerarQrPageModule)
  },
  {
    path: 'gimnasio-movil/:uid',
    loadChildren: () => import('./Usuario/gimnasio-movil/gimnasio-movil.module').then( m => m.GimnasioMovilPageModule)
  },
  {
    path: 'interfaz-gimnasio-movil',
    loadChildren: () => import('./Usuario/interfaz-gimnasio-movil/interfaz-gimnasio-movil.module').then( m => m.InterfazGimnasioMovilPageModule)
  },
  {
    path: 'editar-perfil/:uid',
    loadChildren: () => import('./Usuario/editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule)
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
