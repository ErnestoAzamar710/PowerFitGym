import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos-service.service';
import { DbmongoService } from 'src/app/services/dbmongo.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/iuser';
import { createUserWithEmailAndPassword, Auth } from '@angular/fire/auth';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
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
    private auth: Auth) {
    this.photos = this.photoservices.photos;
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
  crearUsuario(){
    const emailU = this.newUser.email.toString();
    const passwordU = this.newUser.password.toString();
    createUserWithEmailAndPassword(this.auth, emailU, passwordU)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const uid = user.uid;
        console.log(uid);
        this.newUser.uid=uid;
        this.database.addUser(this.newUser).subscribe();
        this.router.navigateByUrl('/admin-usuarios');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  ngOnInit() {
  }

}
