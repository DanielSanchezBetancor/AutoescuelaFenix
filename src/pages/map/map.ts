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
		console.log("(MapPage)constructor");
		platform.ready().then(() => {
			this.loadMap();
			this.createMarker();
		});
	}
	loadMap() {
		console.log("(MapPage)loadMap");
		let mapOptions = {
			center: new google.maps.LatLng(27.991232, -15.420515),
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
	}
	addInfoWindow(marker, content){
		console.log("(MapPage)addInfoWindows");
		let infoWindow = new google.maps.InfoWindow({
			content: content
		});
		google.maps.event.addListener(marker, 'click', () => {
			infoWindow.open(this.map, marker);
		});
	}
	createMarker() {
		console.log("(MapPage)createMarker");
		let marker = new google.maps.Marker({
			map: this.map,
			animation: google.maps.Animation.DROP,
			position: new google.maps.LatLng(27.991232, -15.420515)
		});      
	  this.addInfoWindow(marker, "Calle Doctor Melián. \n35, L-3");
	}
}