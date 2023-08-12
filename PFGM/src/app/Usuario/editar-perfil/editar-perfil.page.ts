import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { PhotosService } from '../../services/photos-service.service';
import { Router } from '@angular/router';
import { DbmongoService } from 'src/app/services/dbmongo.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Auth, updatePassword } from '@angular/fire/auth';
import { async } from '@angular/core/testing';
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
  newPassword:String="";
  confirmaNewPassword:String="";
  photos: String[]=[];
  constructor(private menuCtrl: MenuController,public photoservices:PhotosService,
    private database:DbmongoService,private router:Router, private alertController: AlertController,
    private auth:Auth) { 
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
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });
    if(capturedPhoto.webPath){
      this.photos.unshift(capturedPhoto.webPath);
    }
    const img = capturedPhoto.dataUrl;
    this.actUser.foto = img;
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
  async actualizarDatos(uid:String){
    if(this.actUser.nombre.toString() !="" && this.actUser.telefono>0 
    && this.actUser.foto != "" && this.newPassword !="" && this.confirmaNewPassword!=""){
      if(this.newPassword == this.confirmaNewPassword){
        if(this.newPassword.toString().length < 6){
          const alert = await this.alertController.create({
            header: 'Editar perfil',
            message: 'La nueva constraseña tiene que se mayor a 6 caracteres.',
            buttons: ['Aceptar']
          });
          await alert.present();
        }
        else{        
          const user = this.auth.currentUser;
          if (user !== null) {
            const newPasswordF = this.newPassword.toString();
            const alert = await this.alertController.create({
              header: 'Editar perfil',
              message: '¿Desea realizar los cambios?',
              buttons: [
                {
                  text: 'Aceptar',
                  handler: () => {
                    updatePassword(user,newPasswordF).then(async() => {
                      this.database.putUser(uid,this.actUser).subscribe();
                      this.router.navigate(['/ver-perfil',uid]);  
                    }).catch((error) => {
                      console.log(error);
                    });;
                  }
                }
              ]
            });
            await alert.present();
          }
        }
      }
      else{
        const alert = await this.alertController.create({
          header: 'Editar perfil',
          message: 'Las contraseñas introducidas no coinciden.',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
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