import { ShowPage } from '../show/show.page';

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UpdatePage } from '../update/update.page';
import { CreatePage } from '../create/create.page';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public pedidos:any[] =[];

  constructor(
    private api:ApiService, 
    private alert:AlertController,
    private modal:ModalController
    ) {}

    ngOnInit(){
        this.get();
      }

  get(){
    this.api.getResponse("Pedido","GET").subscribe((data:any) => {
      this. pedidos = data.data;
    })
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
            this.api.getResponse("Pedido/"+id, "DELETE").subscribe(() => {
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



