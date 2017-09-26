import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Response } from '@angular/http';
import { GlobalServices } from '../services/global.services';

@Component({
  selector: 'page-my-personal-schedule-page',
  template: 
  '<ion-content><li *ngFor="let dat of data">Practica {{dat.id_p}}<ul>Fecha: {{dat.date}}</ul><ul>Hora: {{dat.hour}}</ul>' + 
  '<ul><button ion-button (click)="deleteSchedule(dat)">Eliminar</button></ul>' + 
  '</li>' + 
  '<ion-content><div *ngIf="!data">No tienes practicas. Añade una desde la ventana de prácticas.<br><button ion-button (click)="goBack()">Volver atras</button></div>' + 
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
	//Contenido de data
	//.id_p -> id de la practica
	//.date -> fecha
	//.hour -> hora
	//id_up -> id del alumno respecto a la practica
	downloadData() {
		this.globalservices.download("https://aefenixbackend.000webhostapp.com/MySqlPHP/retrieve-personal-schedule.php?id=" + this.id)
		.map((response:Response) => response.json())
		.subscribe((data) => {
			if (data !== undefined) {
				this.checkData(data);
			}
		});
	}
	deleteSchedule(dat) {
		this.globalservices.download("https://aefenixbackend.000webhostapp.com/MySqlPHP/delete-personal-schedule.php?id_p=" + dat.id_p)
		.map((response:Response) => response.json())
		.subscribe((message) => {
			location.reload();
		}, (err) => {
			console.log(err);
		});	
	}
	//Comprobamos al entrar en mis practicas, que no haya ninguna practica de ayer o antes. Si las hay, las eliminare.
	checkData(data) {
		var newData = [];
		var counter = 0;
		let today = new Date().toISOString().slice(0, 10);
		for (let i = 0;i<data.length;i++) {
			if (data[i].date >= today) {
				newData[counter] = data[i];
				counter++;
			} else {
				this.deleteSchedule(data[i]);
			}
		}
		this.data = newData;
	}
	goBack() {
		this.nav.pop();
	}
}
