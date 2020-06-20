import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {

  public direcciones:any = {
    id: null,
    descripcion: null,
  }

  public locaciones:any[]=[];
  public pedidos:any[]=[];


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
    this.api.getResponse("DireccionEnvio/"+id,"GET").subscribe((res1:any) => {
      this.direcciones = res1;
      this.api.getResponse("DireccionEnvio/"+id+"/Locacion","GET").subscribe((res3:any) => {
        this.locaciones = res3.data;
      });
      this.api.getResponse("DireccionEnvio/"+id+"/Pedido","GET").subscribe((res4:any) => {
        this.pedidos = res4.data;
      });
    });
  }

  closeModal(){
    this.modal.dismiss();
  }

}
