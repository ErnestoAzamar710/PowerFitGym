import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { PhotosService } from '../../services/photos-service.service';
import { Router } from '@angular/router';
import { DbmongoService } from 'src/app/services/dbmongo.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  actUser={
    nombre:"",
    telefono:0,
    foto:""
  }
  photos: String[]=[];
  constructor(private menuCtrl: MenuController,public photoservices:PhotosService,
    private database:DbmongoService,private router:Router, private alertController: AlertController) { 
    this.photos = this.photoservices.photos;
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
    estado: "",
    ulPago: ""
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.getUserByUID(this.getIDFromURL());
  }
  async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    console.log(capturedPhoto); 
    //this.newUser.foto = capturedPhoto.webPath?.replace(/^blob:/,'').toString();
    if(capturedPhoto.webPath){
      this.photos.unshift(capturedPhoto.webPath);
    }
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
  async actualizarDatos(uid:String){
    if(this.actUser.nombre.toString() !="" && this.actUser.telefono>0){
      const alert = await this.alertController.create({
            header: 'Editar perfil',
            message: '¿Desea realizar los cambios?',
            buttons: [
              {
                text: 'Aceptar',
                handler: () => {
                  this.database.putUser(uid,this.actUser).subscribe();
                  this.router.navigate(['/ver-perfil',uid]);  
                }
              }
            ]
      });
      await alert.present();
    }
    else{
      const alert = await this.alertController.create({
        header: 'Editar perfil',
        message: 'Cambie los datos presentados.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
}