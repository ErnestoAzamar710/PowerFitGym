import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Administrar Usuarios', url: 'admin-usuarios', icon: 'people' },
    { title: 'Registrar Usuarios', url: 'agregar-usuarios', icon: 'person-add' },
    { title: 'Pago de suscripción', url: 'pago-suscripcion', icon: 'wallet' },
    { title: 'Cerrar Sesión', url: 'iniciar-sesion', icon: 'log-out' },
  ];
  constructor() {}
}
