import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  public data = {
    fechaPedido: "",
    Direccionenvio_id: null,
  }
public fec="";
  public direcciones: any[] = [];



  constructor(
    private api: ApiService,
    private alert: AlertController,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.getDirecciones();

  }

  fecha(){
let date=new Date(this.fec).toLocaleDateString();
return this.convertDate(date);

}

convertDate(dato: string) {
  let v = dato.split("/");
  return (v[2] + "-" + (Number(v[1]) < 10 ? "0" + v[1] : v[1]) + "-" + (Number(v[0]) < 10 ? "0" + v[0] : v[0]))
}

  getDirecciones() {
    this.api.getResponse("DireccionEnvio", "GET").subscribe((data: any) => {
      this.direcciones = data.data;
    });
  }

  send() {
    this.data.fechaPedido=this.fecha();
    this.api.getResponse("Pedido", "POST", this.data).subscribe(() => {
      this.presentAlert("Insercion exitosa");
      this.closeModal();
    }, () => this.presentAlert("No se inserto"));
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
