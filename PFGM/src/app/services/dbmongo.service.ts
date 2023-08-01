import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbmongoService {

  url = "http://localhost:4000/users";

  constructor(private http: HttpClient) { }
  
  getUsers():Observable<any>{
   return this.http.get(this.url);
  }

  addUser(uid: {}):Observable<any>{
    return this.http.post(this.url, uid);
  }
  getUser(uid:String):Observable<any>{
    return this.http.get(`${this.url}/${uid}`);
  }
  delUser(uid:String):Observable<any>{
    return this.http.delete(`${this.url}/${uid}`);
  }
  putUser(uid:String,userC:{}):Observable<any>{
    return this.http.put(`${this.url}/${uid}`,userC);
  }
}
