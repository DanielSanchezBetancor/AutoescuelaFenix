import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Response } from '@angular/http';
import { GlobalServices } from '../services/global.services';

@Component({
  selector: 'page-my-personal-schedule-page',
  template: 
  '<ion-content><li *ngFor="let dat of data">{{dat.date}} - {{dat.hour}}' + 
  '<button ion-button (click)="deleteSchedule(dat)">Eliminar</button>' + 
  '</li>' + 
  '<ion-content><div *ngIf="!data">No tienes practicas. Añade una desde la ventana de prácticas.</div>' + 
  '</ion-content>'
})
export class MyPersonalSchedulePage {
	id: any;
	data: any;
	constructor(private nav: NavController, private navParams: NavParams, private globalservices: GlobalServices, private platform: Platform) {
		platform.ready().then(() => {
			this.id = navParams.get('id');
			this.downloadData();
		});
	}
	downloadData() {
		this.globalservices.download("https://aefenixbackend.000webhostapp.com/MySqlPHP/retrieve-personal-schedule.php?id=" + this.id)
		.map((response:Response) => response.json())
		.subscribe((data) => {
			if (data[0])
				this.data = data;
		});
	}
	deleteSchedule(dat) {
		this.globalservices.download("https://aefenixbackend.000webhostapp.com/MySqlPHP/delete-personal-schedule.php?id_p=" + dat.id_p)
		.map((response:Response) => response.json())
		.subscribe((message) => {
			console.log(message);
			this.globalservices.refreshPage(this.nav, MyPersonalSchedulePage);
		}, (err) => {
			console.log(err);
		});	
	}
}
