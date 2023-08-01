import { Injectable } from '@angular/core';
import { Camera,CameraResultType, CameraSource, Photo } from '@capacitor/camera'

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  photos: String[] =[];
  constructor() { }
  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    console.log(capturedPhoto);
    if(capturedPhoto.webPath){
      this.photos.unshift(capturedPhoto.webPath);
    }
  }
}
