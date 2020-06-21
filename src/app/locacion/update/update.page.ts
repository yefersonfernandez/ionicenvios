import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavParams, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
declare var google;

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
  map:any;
  marker:any;
  latitude:any="";
  longitude:any="";
  public locaciones: any;
  public direcciones: any[] = [];


  constructor(
    public platform:Platform,
    public geolocation:Geolocation,
    private api: ApiService,
    private alert: AlertController,
    private navParam: NavParams,
    private modal: ModalController
  ) {
    this.platform.ready().then(()=>{
      var mapOptions={
        center:{lat:this.data.latitud, lng:this.data.longitud},
        zoom:7
      }
      
      this.map = new google.maps.Map(document.getElementById
      ("map"),mapOptions);
      this.Getlocation();
      })

   }
   
Getlocation()
{

  var ref=this;
  let watch =this.geolocation.watchPosition();
  watch.subscribe((position)=>{
    var gps=new google.maps.LatLng(
      position.coords.latitude,position.coords.longitude);
    if(ref.marker == null){
      ref.marker=new google.maps.Marker({
position:gps,
map:ref.map,
title:'my position'
      })
    }else{

      ref.marker.setPosition(gps);
    }
    ref.map.panTo(gps);
ref.latitude =this.data.latitud;
ref.longitude =this.data.longitud;
  })

 }

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
