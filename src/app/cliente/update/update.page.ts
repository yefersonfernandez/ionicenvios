import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  public data = {
    nombre: "",
    telefono:"",
    email:""
  }
  public cliente:any;

  constructor(
    private api:ApiService,
    private alert:AlertController,
    private navParam:NavParams,
    private modal:ModalController
    ) { }

  ngOnInit() {
    let id = this.navParam.get('id');
    this.api.getResponse("Cliente/"+id,"GET").subscribe((res:any) => {
      this.cliente = res;
      this.data.nombre=res.nombre;
      this.data.email=res.email;
      this.data.telefono=res.telefono;
    });
  }

  send(){
    console.log(this.data)
    this.api.getResponse("Cliente/"+this.cliente.id,"PUT",this.data).subscribe(() => {
      this.presentAlert("Actualizacion exitosa");
      this.closeModal();
    }, () => this.presentAlert("No se actualizo"));
  }

  presentAlert(msj){
    this.alert.create({
      message: msj,
      buttons: ["Ok"]
    }).then(alert => alert.present());
  }

  closeModal(){
    this.modal.dismiss();
  }

}
