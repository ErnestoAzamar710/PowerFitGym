import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DbmongoService } from 'src/app/services/dbmongo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.page.html',
  styleUrls: ['./ver-perfil.page.scss'],
})
export class VerPerfilPage implements OnInit {
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
  constructor(private menuCtrl: MenuController,private database:DbmongoService,
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
}
