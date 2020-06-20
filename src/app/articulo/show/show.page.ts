import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {

  public articulos:any = {
    id: null,
    descripcion: null,
    valorUnitario:null,
    imagen:null
  }

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
    this.api.getResponse("Articulo/"+id,"GET").subscribe((res:any) => {
      this.articulos = res;
      this.api.getResponse("Articulo/"+id+"/Pedido","GET").subscribe((res1:any) => {
        this.pedidos = res1.data;
      });
    });
  }

  closeModal(){
    this.modal.dismiss();
  }

}
