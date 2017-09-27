import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Response } from '@angular/http';
import { GlobalServices } from '../services/global.services';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-my-personal-schedule-page',
  template: 
  '<ion-content><li *ngIf="data" *ngFor="let dat of data">Practica {{dat.n_pract}}<ul>Fecha: {{dat.date}}</ul><ul>Hora: {{dat.hour}}</ul>' + 
  '<ul><button ion-button (click)="deleteSchedule(dat)">Eliminar</button></ul>' + 
  '</li>' + 
  '<ion-content><div *ngIf="!data">No tienes practicas. Añade una desde la ventana de prácticas.<br><button ion-button (click)="goBack()">Volver atras</button></div>' + 
  '</ion-content>'
})
export class MyPersonalSchedulePage {
	id: any;
	data: any;
	n_pract: any;
	constructor(private nav: NavController, private navParams: NavParams, private globalservices: GlobalServices, private platform: Platform, private storage: Storage) {
		this.id = navParams.get('id');
		
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
			console.log("Hubo un error al eliminar la practica. Intentalo de nuevo");
		});	
	}
	//Comprobamos al entrar en mis practicas, que no haya ninguna practica de ayer o antes. Si las hay, las eliminare.
	checkData(data) {
		var newData = [];
		var counter = this.n_pract;
		let today = new Date().toISOString().slice(0, 10);
		for (let i = 0;i<data.length;i++) {
			if (data[i].date >= today) {
				newData[counter] = data[i];
				let newObjectData = {
					id_p: newData[counter].id_p, 
					date: newData[counter].date,
					hour: newData[counter].hour,
					id_up: newData[counter].id_up,
					n_pract: this.n_pract-i
				}
				newData[counter] = newObjectData;
				counter--;
			} else {
				this.deleteSchedule(data[i]);
			}
		}
		this.data = newData;
	}
	goBack() {
		this.nav.pop();
	}
	ionViewWillEnter() {
		this.n_pract = this.storage.get('n_pract').then((n_pract) => { this.n_pract = n_pract });
		this.downloadData();
	}
}
