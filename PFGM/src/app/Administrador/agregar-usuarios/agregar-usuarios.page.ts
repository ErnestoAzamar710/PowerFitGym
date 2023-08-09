import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos-service.service';
import { DbmongoService } from 'src/app/services/dbmongo.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/iuser';
import { createUserWithEmailAndPassword, Auth } from '@angular/fire/auth';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { async } from '@angular/core/testing';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.page.html',
  styleUrls: ['./agregar-usuarios.page.scss'],
})
export class AgregarUsuariosPage implements OnInit {
  newUser:IUser={
    uid:"",
    nombre:"",
    telefono:656,
    email:"",
    password:"",
    foto:""
  }
  photos: String[]=[];

  constructor(public photoservices:PhotosService,
    private database:DbmongoService,
    private router:Router,
    private auth: Auth,
    private alertController:AlertController) {
    this.photos = this.photoservices.photos;
  }

  async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });
    console.log(capturedPhoto); 
    //this.newUser.foto = capturedPhoto.webPath?.replace(/^blob:/,'').toString();
    if(capturedPhoto.webPath){
      this.photos.unshift(capturedPhoto.webPath);
    }
    const img = capturedPhoto.dataUrl;
    this.newUser.foto = img;
  }
  async crearUsuario(){
    if(this.newUser.email.toString()!="" && this.newUser.password.toString()!=""
    && this.newUser.nombre.toString()!="" && this.newUser.foto != ""){
      if(this.newUser.password.toString().length < 6){
        const alert = await this.alertController.create({
          header: 'Registro de Usuario',
          message: `La constraseña tiene que ser mayor a 6 caracteres.`,
          buttons: ['Aceptar']
        });
        await alert.present();
      }
      else{
        const emailU = this.newUser.email.toString();
        const passwordU = this.newUser.password.toString();
        createUserWithEmailAndPassword(this.auth, emailU, passwordU)
        .then(async (userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const uid = user.uid;
          console.log(uid);
          this.newUser.uid=uid;
          const alert = await this.alertController.create({
            header: 'Registro de Usuario',
            message: `Registro exitoso.`,
            buttons: [
              {
                text: 'Aceptar',
                role: 'Aceptar',
                handler: () => {
                  this.database.addUser(this.newUser).subscribe();
                  this.router.navigateByUrl('/admin-usuarios');     
                }
              },
            ]
          });
          await alert.present();
        })
        .catch(async (error) => {
          const alert = await this.alertController.create({
            header: 'Registro de Usuario',
            message: `Ocurrio un error en el registro, favor de intentarlo más tarde.`,
            buttons: ['Aceptar']
          });
        
          await alert.present();
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
      }
    }
    else{
      const alert = await this.alertController.create({
        header: 'Registro de Usuario',
        message: `Llene los campos faltantes.`,
        buttons: ['Aceptar']
      });
    
      await alert.present();
    }
    
  }
  ngOnInit() {
  }

}
