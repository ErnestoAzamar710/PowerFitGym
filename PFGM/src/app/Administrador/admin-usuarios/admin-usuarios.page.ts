import { Component, OnInit } from '@angular/core';
import { DbmongoService } from 'src/app/services/dbmongo.service';
import { Auth } from '@angular/fire/auth';
import { InfiniteScrollCustomEvent, LoadingController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.page.html',
  styleUrls: ['./admin-usuarios.page.scss'],
})
export class AdminUsuariosPage implements OnInit {

  constructor(private database:DbmongoService, private Auth: Auth, 
    private loadingCtrl:LoadingController,private alertController: AlertController) { }
  USUARIOS:any=[];
  public results = [...this.USUARIOS];
  ngOnInit() {
  }
  ionViewWillEnter(){
    this.loadClientes();
  }
  User={
    _id: "",
    uid: "",
    nombre: "",
  }
  async loadClientes(event?:InfiniteScrollCustomEvent){
    const loading = await this.loadingCtrl.create({
      message: "Cargando ....",
      spinner: "bubbles"
    });
    await loading.present();
    this.database.getUsers().subscribe(data =>{
      loading.dismiss();
      this.USUARIOS = data;
      this.results = [...this.USUARIOS];
      
      console.log(data)
    }, error => {
      console.log(error);
    })
  }
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = Object.keys(this.USUARIOS)
      .filter(key => this.USUARIOS[key].nombre.toLowerCase().indexOf(query) > -1)
      .map(key => this.USUARIOS[key]);
  }
  async eliminarUsuario(uid:String){
    console.log(uid);
    this.database.getUser(uid).subscribe(
      async (data)=>{
        this.User=data;
        console.log(this.User);
        const alert = await this.alertController.create({
          header: 'Confirmación de Eliminación',
          message: `¿Desea eliminar al Usuario: ${this.User.nombre}?`,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('Botón Cancelar presionado');
              }
            },
            {
              text: 'Aceptar',
              handler: () => {
                this.database.delUser(uid).subscribe(
                  ()=>{
                    console.log('Registro eliminado exitosamente.');
                    location.reload();
                  },
                  (error)=>{
                    console.error('Error al eliminar registro:', error);
                  }
                );
    
              }
            }
          ]
        });
        await alert.present();
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
