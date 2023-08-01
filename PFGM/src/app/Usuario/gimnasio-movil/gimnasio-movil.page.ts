import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PhotosService } from '../../services/photos-service.service';
import { Router } from '@angular/router';
import { DbmongoService } from 'src/app/services/dbmongo.service';
@Component({
  selector: 'app-gimnasio-movil',
  templateUrl: './gimnasio-movil.page.html',
  styleUrls: ['./gimnasio-movil.page.scss'],
})
export class GimnasioMovilPage implements OnInit {

  constructor(private menuCtrl: MenuController,public photoservices:PhotosService,
    private database:DbmongoService,private router:Router) { 
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
