import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {
  email: string="";
  password: string="";
  constructor(private menuCtrl: MenuController, private Auth: Auth,private router:Router) { }
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }
  ngOnInit() {
  }
  loginEmailPass(){
    signInWithEmailAndPassword(this.Auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const uid = user.uid;
        const uemail = user.email;
        console.log(uid,uemail);
        //if(uemail != "asanchezazamar@gmail.com"){
          if(uemail != "saturving@gmail.com"){
          this.router.navigate(['/opciones-usuario',uid]);
        }
        else{
          window.location.href = '/admin-usuarios';
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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
        console.log(uid);
        //if(uemail != "asanchezazamar@gmail.com"){
          if(uemail != "saturving@gmail.com"){
          this.router.navigate(['/opciones-usuario',uid]);
        }
        else{
          window.location.href = '/admin-usuarios';
        }
        
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
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
