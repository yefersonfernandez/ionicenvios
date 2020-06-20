import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {

  public cliente:any = {
    id: null,
    nombre: null,
    telefono: null,
    email: null,
  }

  public direcciones:any[]=[];

  constructor(
    private api:ApiService,
    private navParam:NavParams,
    private modal:ModalController
  ) { }

  ngOnInit() {
    this.get();
  }

  get(){
    let id = this.navParam.get('id');
    this.api.getResponse("Cliente/"+id,"GET").subscribe((res:any) => {
      this.cliente = res;
      this.api.getResponse("Cliente/"+id+"/DireccionEnvio","GET").subscribe((res1:any) => {
        this.direcciones = res1.data;
      });
    });
  }

  closeModal(){
    this.modal.dismiss();
  }

}
