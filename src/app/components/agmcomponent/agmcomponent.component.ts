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
  zoom = 9;
  results = [];
  isCollapse = false;
  icon = 'https://www.baume-et-mercier.com/etc.clientlibs/richemont-bem/ui/clientlibs/libs/resources/static/bem-pin-icon.svg';

  infoWindowOpened = null;
  styles: any[] = [
    {
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#f5f5f5'
        }
      ]
    },
    {
      'elementType': 'labels.icon',
      'stylers': [
        {
          'visibility': 'on'
        }
      ]
    },
    {
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#4c4c4c'
        }
      ]
    },
    {
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'color': '#f5f5f5'
        }
      ]
    },
    {
      'featureType': 'administrative.land_parcel',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#bdbdbd'
        }
      ]
    },
    {
      'featureType': 'poi',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#eeeeee'
        }
      ]
    },
    {
      'featureType': 'poi',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#757575'
        }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#e5e5e5'
        }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#9e9e9e'
        }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#ffffff'
        }
      ]
    },
    {
      'featureType': 'road.arterial',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#757575'
        }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#dadada'
        }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#616161'
        }
      ]
    },
    {
      'featureType': 'road.local',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#9e9e9e'
        }
      ]
    },
    {
      'featureType': 'transit.line',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#e5e5e5'
        }
      ]
    },
    {
      'featureType': 'transit.station',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#eeeeee'
        }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#2196F3'
        }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#ffffff'
        }
      ]
    }
  ];
  constructor(public dataServiceService: DataServiceService, public gMaps: GoogleMapsAPIWrapper) { }

  protected mapReady(map) {
    this.map = map;
  }
  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.dataServiceService.getResult().subscribe((resp: any) => {
          this.ShopList = [...resp];
          this.NearestCity(this.latitude, this.longitude, resp);
        });
      });
    } else {
      alert('Geo Location Not Supported')
    }
  }
  getAddress(place: any) {
    this.latitude = place.geometry.location.lat();
    this.longitude = place.geometry.location.lng();
    this.map.setCenter({ lat: this.latitude, lng: this.longitude });
  
    this.NearestCity(this.latitude , this.longitude , this.ShopList);

    this.zoom = 10;
    this.infoWindowOpened = null;

  }
  selectMarker(event, id) {
    console.log(id);
    this.map.setCenter({ lat: event.latitude, lng: event.longitude });
    this.zoom = 12;
    this.scrollTabContentToTop(id);
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
    this.zoom = 10;
  }
  showInfoWindow(infoWindow) {
    if (this.infoWindowOpened === infoWindow) {
        return;
    }

    if (this.infoWindowOpened !== null) {
        this.infoWindowOpened.close();
    }
    this.infoWindowOpened = infoWindow;
}
toggle(){
  this.isCollapse = !this.isCollapse;
}
searchStore(object){
  this.map.setCenter({ lat: object.location.latitude, lng: object.location.longitude });
  this.isCollapse = false;
  this.zoom = 12;

}
  private scrollTabContentToTop(id): void {

    if (!this.isCollapse) {
      return;
    }

    const els: any = document.getElementsByClassName('list-group-item');
    for (let i = 0; i < els.length; i++) {
      els[i].classList.remove('active');
    }
    const ele = document.getElementById(id);
    ele.scrollIntoView();
    ele.classList.add('active');


    // document.getElementById('ulContainer').scrollTop = ele.offsetHeight;

  }
}
