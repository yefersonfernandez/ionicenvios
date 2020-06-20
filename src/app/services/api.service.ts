import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public PATH = "http://apiyefer.yca.com.co/api/";

  constructor(private http: HttpClient) { }

  getResponse(url:string, method:string, data:any=[]){
    let opcion = {
      body: data
    };
    return this.http.request(method,this.PATH+url,opcion);
  }

}
