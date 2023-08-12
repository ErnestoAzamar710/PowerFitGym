import { Component, OnInit } from '@angular/core';
import { DbmongoService } from 'src/app/services/dbmongo.service';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-pago-suscripcion',
  templateUrl: './pago-suscripcion.page.html',
  styleUrls: ['./pago-suscripcion.page.scss'],
})
export class PagoSuscripcionPage implements OnInit {

  constructor(private database:DbmongoService, private loadingCtrl:LoadingController) { }
  USUARIOS:any=[];
  public results = [...this.USUARIOS];
  ngOnInit() {
  }
  ionViewWillEnter(){
    this.loadClientes();
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
}
