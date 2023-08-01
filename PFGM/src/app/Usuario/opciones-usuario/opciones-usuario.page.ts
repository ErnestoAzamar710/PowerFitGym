import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DbmongoService } from 'src/app/services/dbmongo.service';
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
    estado: ""
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
    let id = arr[2]
    return id    
  }
  verperfil(){
    this.router.navigate(['/ver-perfil',this.User.uid]);
  }
}
