import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {
  email: string="";
  password: string="";
  constructor(private menuCtrl: MenuController, private Auth: Auth,
    private router:Router, private alertController: AlertController) { }
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }
  ngOnInit() {
  }
  async loginEmailPass(){
    if(this.email != "" && this.password != ""){
      signInWithEmailAndPassword(this.Auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const uid = user.uid;
        const uemail = user.email;
        if(uemail != "asanchezazamar@gmail.com" && uemail != "saturving@gmail.com"){
           this.router.navigate(['/opciones-usuario',uid]);
         }
         else{
           window.location.href = '/admin-usuarios';
         }
      })
      .catch(async (error) => {
        const alert = await this.alertController.create({
          header: 'Inicio de Sesión',
          message: `Correo y/o Contraseña incorrecta.`,
          buttons: ['Aceptar']
        });
      
        await alert.present();
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
    else{
      const alert = await this.alertController.create({
        header: 'Inicio de Sesión',
        message: `Ingrese los datos faltantes`,
        buttons: ['Aceptar']
      });
    
      await alert.present();
    }
  }
  loginGoogle(){
    const app = initializeApp(environment.firebase);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        const uemail = user.email;
        const uid = user.uid;
        if(uemail != "asanchezazamar@gmail.com" && uemail != "saturving@gmail.com"){
           this.router.navigate(['/opciones-usuario',uid]);
         }
         else{
           window.location.href = '/admin-usuarios';
         }
        
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch(async (error) => {
        const alert = await this.alertController.create({
          header: 'Inicio de Sesión',
          message: `Ocurrio un error intentelo más tarde.`,
          buttons: ['Aceptar']
        });
      
        await alert.present();
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
}
