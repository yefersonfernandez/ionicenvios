import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { AlertController, ModalController } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Platform } from "@ionic/angular";

declare var google;
@Component({
  selector: "app-create",
  templateUrl: "./create.page.html",
  styleUrls: ["./create.page.scss"],
})
export class CreatePage implements OnInit {
  map: any;
  marker: any;
  latitude: any = "";
  longitude: any = "";

  public data = {
    longitud: "",
    latitud: "",
    Direccionenvio_id: null,
  };
  public direcciones: any[] = [];

  constructor(
    public platform: Platform,
    public geolocation: Geolocation,
    private api: ApiService,
    private alert: AlertController,
    private modal: ModalController
  ) {}

  Getlocation() {
    var ref = this;
    let watch = this.geolocation.watchPosition();
    watch.subscribe((position) => {
      var gps = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      if (ref.marker == null) {
        ref.marker = new google.maps.Marker({
          position: gps,
          map: ref.map,
          title: "my position",
        });
      } else {
        ref.marker.setPosition(gps);
      }
      ref.map.panTo(gps);
      
      ref.data.latitud = position.coords.latitude.toString();
      ref.data.longitud = position.coords.longitude.toString();


    });
  }

  ngOnInit() {
    var mapOptions = {
      center: { lat: -25.363882, lng: 131.044922 },
      zoom: 7,
    };

    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    this.Getlocation();

    this.getDirecciones();
  }

  getDirecciones() {
    this.api.getResponse("DireccionEnvio", "GET").subscribe((data: any) => {
      this.direcciones = data.data;
    });
  }

  send() {
    this.api.getResponse("Locacion", "POST", this.data).subscribe(
      () => {
        this.presentAlert("Insercion exitosa");
        this.closeModal();
      },
      () => this.presentAlert("No se inserto")
    );
  }

  presentAlert(msj) {
    this.alert
      .create({
        message: msj,
        buttons: ["Ok"],
      })
      .then((alert) => alert.present());
  }

  closeModal() {
    this.modal.dismiss();
  }
}
