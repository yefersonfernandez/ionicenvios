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
    descripcion: "",
    ciudad_id: null,
    cliente_id: null
  }

  public ciudades: any[] = [];
  public clientes: any[] = [];


  constructor(
    private api: ApiService,
    private alert: AlertController,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.getCiudades();
    this.getClientes();

  }

  getCiudades() {
    this.api.getResponse("Ciudad", "GET").subscribe((data: any) => {
      this.ciudades = data.data;
    });
  }
  getClientes() {
    this.api.getResponse("Cliente", "GET").subscribe((data: any) => {
      this.clientes = data.data;
    });
  }

  send() {
    this.api.getResponse("DireccionEnvio", "POST", this.data).subscribe(() => {
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
