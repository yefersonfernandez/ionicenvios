import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {

  public pedidos:any = {
    id: null,
    fechaPedido: null
  }

  public articulos:any[]=[];


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
    this.api.getResponse("Pedido/"+id,"GET").subscribe((res:any) => {
      this.pedidos = res;
      this.api.getResponse("Pedido/"+id+"/Articulo","GET").subscribe((res1:any) => {
        this.articulos = res1.data;
      });
    });
  }

  closeModal(){
    this.modal.dismiss();
  }

}
