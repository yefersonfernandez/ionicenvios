import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UpdatePage } from '../ciudad/update/update.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public ciudades:any[] =[];

  constructor(
    private api:ApiService, 
    private alert:AlertController,
    private router: Router,
    private modal:ModalController
    ) {}

  ngOnInit(){
    this.api.getResponse("Ciudad","GET").subscribe((data:any) => {
      this.ciudades = data.data;
    })
  }
  menu(){
    
  }

  eliminar(id){
    this.alert.create({
      message: "¿Está seguro de eliminar?",
      buttons: [
        {
          text: "Si",
          handler: () => {
            this.api.getResponse("Ciudad/"+id, "DELETE").subscribe(() => {
              this.presentAlert("Eliminacion exitosa");
            },() => this.presentAlert("No se dio la eliminacion"));
          }
        },
        {
          text:"No",
          role: 'cancel'
        }
      ]
    }).then(alert => alert.present());
  }

  presentAlert(msj:string){
    this.alert.create({
      message: msj,
      buttons: ["Ok"]
    }).then(alert => alert.present());
  }

  create(){
    this.router.navigate(["create"]);
  }

  update(id){
    this.modal.create({
      component: UpdatePage,
      componentProps: {
        'id': id
      }
    }).then(modal => modal.present());
  }

}
