import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DbmongoService } from 'src/app/services/dbmongo.service';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;   
@Component({
  selector: 'app-opciones-usuario',
  templateUrl: './opciones-usuario.page.html',
  styleUrls: ['./opciones-usuario.page.scss'],
})
export class OpcionesUsuarioPage implements OnInit {
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
  constructor(private menuCtrl: MenuController, private database:DbmongoService,
    private router:Router) { }
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.getUserByUID(this.getIDFromURL());
  }
  ngOnInit() {
  }
  getUserByUID(uid:String){
    this.database.getUser(uid).subscribe(
      (data)=>{
        this.User=data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  getIDFromURL(){
    let url = this.router.url
    let arr = url.split("/",3)
    let id = arr[2]
    return id    
  }
  verperfil(){
    this.router.navigate(['/ver-perfil',this.User.uid]);
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
}
