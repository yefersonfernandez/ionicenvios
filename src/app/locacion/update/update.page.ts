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
    longitud: "",
    latitud: "",
    Direccionenvio_id: null,
  }
  public locaciones: any;
  public direcciones: any[] = [];


  constructor(
    private api: ApiService,
    private alert: AlertController,
    private navParam: NavParams,
    private modal: ModalController
  ) { }

  ngOnInit() {
    let id = this.navParam.get('id');
    this.api.getResponse("DireccionEnvio", "GET").subscribe((data: any) => {
      this.direcciones = data.data; 
      this.api.getResponse("Locacion/" + id, "GET").subscribe((res: any) => {
        this.locaciones = res;
        this.data.longitud = res.longitud;
        this.data.latitud = res.latitud;
        this.data.Direccionenvio_id = res.Direccionenvio_id;

      });
    });
}


  send() {
    this.api.getResponse("Locacion/" + this.locaciones.id, "PUT", this.data).subscribe(() => {
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
