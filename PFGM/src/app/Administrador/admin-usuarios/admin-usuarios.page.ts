import { Component, OnInit } from '@angular/core';
import { DbmongoService } from 'src/app/services/dbmongo.service';
import { Auth } from '@angular/fire/auth';
import { InfiniteScrollCustomEvent, LoadingController, AlertController } from '@ionic/angular';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;   
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
    foto: "",
    email: "",
    telefono: 0,
    diaIn: "",
    ulDia: "",
    plan: "",
    estado: "",
    ulPago:""
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
  generatePDF(uid:String) {
    this.database.getUser(uid).subscribe(
      async (data)=>{
        this.User=data;
        let docDefinition = { 
          pageSize: 'A7', // Tamaño de página A6 (105 x 148 mm)
          pageMargins: [10, 10, 10, 10],
          content: [
            {
              text: 'Comprobante de Pago',
              style: 'header'
            },
            {
              columns: [
              {
                width: '*',
                text: 'PowerFit Gym',
                style: 'companyName'
              }
              ]
            },
            {
              text: [
                { text: 'Cliente: ', bold: true },
                `\n\n${this.User.nombre}\n\n`,
                { text: 'Plan: ', bold: true },
                `\n\n${this.User.plan}\n\n`,
                { text: 'Día del Pago: ', bold: true },
                `\n\n${this.User.ulPago}\n\n\n`,
                {text:'__________________________________', bold: true}
              ],
              style: 'details',
              margin: [0, 20]
            }
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              alignment: 'center',
              margin: [0, 0, 0, 10]
            },
            companyName: {
              fontSize: 16,
              bold: true,
              alignment: 'center',
            },
            details: {
              alignment: 'center'
            }
          }
        };  
       
        pdfMake.createPdf(docDefinition).open();
      },
      (error)=>{
        console.log(error);
      }
    );  
  }  
  async eliminarUsuario(uid:String){
    this.database.getUser(uid).subscribe(
      async (data)=>{
        this.User=data;
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