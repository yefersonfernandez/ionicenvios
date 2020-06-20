import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {

  public ciudad:any = {
    id: null,
    nombre: null,
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
    this.api.getResponse("Ciudad/"+id,"GET").subscribe((res:any) => {
      this.ciudad = res;
      this.api.getResponse("Ciudad/"+id+"/DireccionEnvio","GET").subscribe((res1:any) => {
        this.direcciones = res1.data;
      });
    });
  }

  closeModal(){
    this.modal.dismiss();
  }

}
