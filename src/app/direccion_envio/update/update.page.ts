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
    descripcion: "",
    ciudad_id: null,
    cliente_id: null
  }
  public direcciones: any;
  public ciudades: any[] = [];
  public clientes: any[] = [];


  constructor(
    private api: ApiService,
    private alert: AlertController,
    private navParam: NavParams,
    private modal: ModalController
  ) { }

  ngOnInit() {
    let id = this.navParam.get('id');
    this.api.getResponse("Ciudad", "GET").subscribe((data: any) => {
      this.ciudades = data.data; 
      let id = this.navParam.get('id');
      this.api.getResponse("Cliente", "GET").subscribe((data: any) => {
        this.clientes = data.data; 
      this.api.getResponse("DireccionEnvio/" + id, "GET").subscribe((res: any) => {
        this.direcciones = res;
        this.data.descripcion = res.descripcion;
        this.data.ciudad_id = res.ciudad_id;
        this.data.cliente_id = res.cliente_id;

      });
    });

  });
}

  send() {
    console.log(this.data)
    this.api.getResponse("DireccionEnvio/" + this.direcciones.id, "PUT", this.data).subscribe(() => {
      this.presentAlert("Actualizacion exitosa");
      this.closeModal();
    }, () => this.presentAlert("No se actualizo"));
  }

  presentAlert(msj) {
    this.alert.create({
      message: msj,
      buttons: ["Ok"]
    }).then(alert => alert.present());
  }

  closeModal() {
    this.modal.dismiss();
  }

}
