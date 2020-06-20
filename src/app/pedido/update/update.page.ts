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
    fechaPedido: "",
    Direccionenvio_id: null,
  }
public fec="";
  public pedidos: any;
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
      this.api.getResponse("Pedido/" + id, "GET").subscribe((res: any) => {
        this.pedidos = res;
        this.fec= res.fechaPedido;
        this.data.Direccionenvio_id = res.Direccionenvio_id;

      });
    });
}
fecha(){
  let date=new Date(this.fec).toLocaleDateString();
  return this.convertDate(date);
  
  }
  
  convertDate(dato: string) {
    let v = dato.split("/");
    return (v[2] + "-" + (Number(v[1]) < 10 ? "0" + v[1] : v[1]) + "-" + (Number(v[0]) < 10 ? "0" + v[0] : v[0]))
  }

  send() {
    this.data.fechaPedido=this.fecha();
    this.api.getResponse("Pedido/" + this.pedidos.id, "PUT", this.data).subscribe(() => {
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
