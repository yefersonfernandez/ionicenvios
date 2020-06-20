
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ShowPage } from '../show/show.page';
import { UpdatePage } from '../update/update.page';
import { CreatePage } from '../create/create.page';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public direcciones:any[] =[];
  public textoBuscar ='';
  constructor(
    private api:ApiService, 
    private alert:AlertController,
    private modal:ModalController
    ) {}

    ngOnInit(){
        this.get();
      }

  get(){
    this.api.getResponse("DireccionEnvio","GET").subscribe((data:any) => {
      this. direcciones = data.data;
    })
  }
 

  buscar(event){
    this.textoBuscar = event.detail.value;
  }


  doRefresh(event) {

    setTimeout(() => {
      this.get();
      event.target.complete();
    }, 2000);
  }


  eliminar(id){
    this.alert.create({
      message: "¿Está seguro de eliminar?",
      buttons: [
        {
          text: "Si",
          handler: () => {
            this.api.getResponse("DireccionEnvio/"+id, "DELETE").subscribe(() => {
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
    this.modal.create({
      component: CreatePage,
    }).then(modal => modal.present());
  }

  update(id){
    this.modal.create({
      component: UpdatePage,
      componentProps: {
        'id': id
      }
    }).then(modal => modal.present());
  }
  show(id){
    this.modal.create({
      component: ShowPage,
      componentProps: {
        'id': id
      }
    }).then(modal => modal.present());
  }

  

}



