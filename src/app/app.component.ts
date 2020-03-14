import { Component, OnInit, ViewChild , DoCheck} from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { DataServiceService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'googleMap';
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
  zoom = 10;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 40,
    minZoom: 8
  };
  results = [];
  ShopList = [];
  changed = true;
  icon ='https://www.baume-et-mercier.com/etc.clientlibs/richemont-bem/ui/clientlibs/libs/resources/static/bem-pin-icon.svg';
  markers = [];
  infoContent = '';
  constructor(public dataServiceService: DataServiceService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.dataServiceService.getResult().subscribe((resp: any) => {
        this.ShopList = [...resp];
        this.NearestCity(this.center.lat, this.center.lng, resp);
       

      });

    });
  }
  ngDoCheck() {
  }
  click(event: google.maps.MouseEvent) {
    console.log(event);
  }
  zoomIn() {
    if (this.zoom < this.options.maxZoom) {
      this.zoom++;
    }
  }

  pushMarkers(response) {
   

    for (let index = 0; index < response.length; index++) {
      this.markers.push({
        position: {
          lat: response[index].location.latitude,
          lng: response[index].location.longitude,
        },
        title: response[index].name ,
        info: `<p class="text-bold"> ${response[index].name} </p>
        <p> ${response[index].address.city},${response[index].address.country}-${response[index].address.zipCode} </p>
        ` ,
        options: {
          animation: google.maps.Animation.DROP,
          icon : this.icon
        }
      });

    }



  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) {
      this.zoom--;
    }
  }
  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
  }

  addMarker() {

    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: '#e20074',
        text: 'S',
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content;
    this.info.open(marker);
  }
  getAddress(place: any) {
    this.center = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
    this.zoom =10;
    this.NearestCity(this.center.lat, this.center.lng, this.ShopList);

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
    this.pushMarkers(this.results);
    console.log(this.results);
  }
}
