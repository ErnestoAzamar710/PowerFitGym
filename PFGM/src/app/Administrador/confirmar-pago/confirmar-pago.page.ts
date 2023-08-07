import { Component, OnInit } from '@angular/core';
import { DbmongoService } from 'src/app/services/dbmongo.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-confirmar-pago',
  templateUrl: './confirmar-pago.page.html',
  styleUrls: ['./confirmar-pago.page.scss'],
})
export class ConfirmarPagoPage implements OnInit {
  selectedOption: string = "";
  selectedOptionValue: Number = 0;
  MontoRecibido: Number = 0;
  ultimoDia: String = "";
  CambiosUser={
    plan:"",
    estado:"",
    ulDia:"",
    ulPago:""
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
    estado: ""
  }
  constructor(private database:DbmongoService,private router:Router, 
    private alertController: AlertController) { }
  DIA: Number = 100;
  SEMANA: Number = 250;
  MES: Number = 650;
  AÑO: Number = 3600;
  
  ngOnInit() {
  }
  ionViewDidEnter() {
    this.getUserByUID(this.getIDFromURL());
  }
  onOptionChange() {
    // Aquí actualizamos el valor del campo seleccionado
    if (this.selectedOption === 'DIA') {
      this.selectedOptionValue = 100.00;
    } else if (this.selectedOption === 'SEMANA') {
      this.selectedOptionValue = 250.00;
    } else if (this.selectedOption === 'MENSUAL') {
      this.selectedOptionValue = 650.00;
    } else if (this.selectedOption === 'ANUAL') {
      this.selectedOptionValue = 3600.00;
    } else {
      this.selectedOptionValue = 0; // Manejar otra opción o opción vacía si es necesario
    }
  }
  async pagado(){
    const resulado = this.MontoRecibido.valueOf() - this.selectedOptionValue.valueOf(); 
    console.log(resulado);
    this.CambiosUser.plan = this.selectedOption;
    this.CambiosUser.estado = "ACTIVO";
    this.CambiosUser.ulDia = this.ultimoDia.toString();
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mesp = fechaActual.getMonth()+1; // Los meses empiezan en 0 (enero es 0)
    const díap = fechaActual.getDate();
    let fActual: string;
    if(mesp < 10){
      const mes = "0"+mesp
      if(díap < 10){
        const dia = "0"+díap;
        fActual = año+"-"+mes+"-"+díap;
        console.log(fActual);
      }
      else{
        fActual = año+"-"+mes+"-"+díap;
        console.log(fActual);
      }
    }
    else{
      if(díap < 10){
        const dia = "0"+díap;
        fActual = año+"-"+mesp+"-"+dia;
        console.log(fActual);
      }
      else{
        fActual = año+"-"+mesp+"-"+díap;
        console.log(fActual);
      }
    }
    this.CambiosUser.ulPago = fActual;
    const alert = await this.alertController.create({
      header: 'Confirmación de Pago',
      message: `¿Estás seguro de realizar el pago? \n El pago a realizar es para: ${this.User.nombre}. \n De ser asi el cambio es de: $ ${resulado}`,
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
            const uidACT = this.User.uid.toString();
            console.log(uidACT);
            this.actualizarDatos(uidACT);

          }
        }
      ]
    });
  
    await alert.present();
    
  }
  getUserByUID(uid:String){
    this.database.getUser(uid).subscribe(
      (data)=>{
        this.User=data;
        console.log(this.User);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  getIDFromURL(){
    let url = this.router.url
    let arr = url.split("/",3)
    let uid = (arr[2])
    console.log(uid)
    return uid
  }
  actualizarDatos(uid:String){
    this.database.putUser(uid,this.CambiosUser).subscribe();
    this.router.navigate(['/admin-usuarios']);
  }
}
