import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbmongoService } from 'src/app/services/dbmongo.service';
@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage implements OnInit {
  constructor(private menuCtrl: MenuController,private database:DbmongoService,private router:Router) { 
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.getUserByUID(this.getIDFromURL());
  }
  ngOnInit() {
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
}
