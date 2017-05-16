import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
declare var google;
@Component({
	selector: 'page-map',
	templateUrl: 'map.html'
})

export class MapPage {
	@ViewChild('map') mapElement: ElementRef;
	map: any;
	constructor(public platform: Platform) {
		platform.ready().then(() => {
			this.loadMap();
			this.createMarker();
		});
	}
	loadMap() {
		 let latLng = new google.maps.LatLng(27.991232, -15.420515);
		let mapOptions = {
			center: latLng,
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
	}
	addInfoWindow(marker, content){
	  let infoWindow = new google.maps.InfoWindow({
		content: content
	  });
	  google.maps.event.addListener(marker, 'click', () => {
		infoWindow.open(this.map, marker);
	  });
 
}
	createMarker() {
			let marker = new google.maps.Marker({
				map: this.map,
				animation: google.maps.Animation.DROP,
				position: new google.maps.LatLng(27.991232, -15.420515)
			});
	 
	  let content = "Calle Doctor Melián. \n35, L-3";          
	 
	  this.addInfoWindow(marker, content);
	}
	
  }