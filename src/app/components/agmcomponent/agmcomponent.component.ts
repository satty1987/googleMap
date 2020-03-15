import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/api.service';
import { GoogleMapsAPIWrapper } from '@agm/core';


@Component({
  selector: 'app-agmcomponent',
  templateUrl: './agmcomponent.component.html',
  styleUrls: ['./agmcomponent.component.css']
})
export class AgmcomponentComponent implements OnInit {
  latitude = -28.68352;
  longitude = -147.20785;
  mapType = 'terrain';
  ShopList = [];
  protected map: any;
  markers = [];
  zoom = 8;
  results = [];
  isCollapse = false;
  icon = 'https://www.baume-et-mercier.com/etc.clientlibs/richemont-bem/ui/clientlibs/libs/resources/static/bem-pin-icon.svg';

  currentIW = null;
  previousIW = null;
  constructor(public dataServiceService: DataServiceService, public gMaps: GoogleMapsAPIWrapper) { }

  protected mapReady(map) {
    this.map = map;
  }
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
    this.dataServiceService.getResult().subscribe((resp: any) => {
      this.ShopList = [...resp];
      this.NearestCity(this.latitude , this.longitude, resp) ;


    });
  }
  getAddress(place: any) {
    this.latitude = place.geometry.location.lat();
    this.longitude = place.geometry.location.lng();
    this.map.setCenter({ lat: this.latitude, lng: this.longitude });
  
    this.NearestCity(this.latitude , this.longitude , this.ShopList);

    this.zoom = 10;
  }
  selectMarker(event){
    console.log(event);
    this.map.setCenter({ lat: event.latitude, lng: event.longitude });
    this.zoom = 12;
  }
  Deg2Rad(deg) {
    return deg * Math.PI / 180;
  }

  PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
    lat1 = this.Deg2Rad(lat1);
    lat2 = this.Deg2Rad(lat2);
    lon1 = this.Deg2Rad(lon1);
    lon2 = this.Deg2Rad(lon2);
    const R = 50000; // km
    const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    const y = (lat2 - lat1);
    const d = Math.sqrt(x * x + y * y) * R;
    return d;
  }

  NearestCity(latitude, longitude, locations) {
    const mindif = 500;
    let closest;
    this.results = [];

    for (let index = 0; index <  this.ShopList.length; ++index) {
      const dif = this.PythagorasEquirectangular(latitude, longitude, locations[index].location.latitude, 
        locations[index].location.longitude);
      if (dif < mindif) {
        closest = index;
       // mindif = dif;
        this.results.push(locations[index]);
      }
    }
    this.markers = this.results;
    console.log(this.results);
  }
  markerClick(infoWindow) {
    if (this.previousIW) {
      this.currentIW = infoWindow;
      this.previousIW.close();
    }
    this.previousIW = infoWindow;
}
toggle(){
  this.isCollapse = !this.isCollapse;
}
searchStore(object){
  this.map.setCenter({ lat: object.location.latitude, lng: object.location.longitude });
  this.isCollapse = false;
  this.zoom = 12;

}
}
