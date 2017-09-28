import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Response } from '@angular/http';
import { GlobalServices } from '../services/global.services';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-my-personal-schedule-page',
  template: 
  '<ion-content><li *ngFor="let dat of data">Practica {{dat.n_pract}}<ul>Fecha: {{dat.date}}</ul><ul>Hora: {{dat.hour}}</ul>' + 
  '<ul><button ion-button (click)="deleteSchedule(dat)">Eliminar</button></ul>' + 
  '</li>' + 
  '<ion-content><div *ngIf="!data || data.length <= 0">No tienes practicas. Añade una desde la ventana de prácticas.</div>'
  + '<button ion-button (click)="goBack()">Volver atras</button>' 
  + '</ion-content>'
})
export class MyPersonalSchedulePage {
	id: any;
	data: any;
	n_pract: any;
	constructor(private nav: NavController, private navParams: NavParams, private globalservices: GlobalServices, private platform: Platform, private storage: Storage, private loadingCtrl: LoadingController) {
		let loading = this.loadingCtrl.create({
			content: "Espere por favor..."
		});
		loading.present();
		this.id = navParams.get('id');
		this.downloadData(loading);
	}
	//Contenido de data
	//.id_p -> id de la practica
	//.date -> fecha
	//.hour -> hora
	//id_up -> id del alumno respecto a la practica
	downloadData(loading) {
		if (this.id === undefined) {
			console.log("No se ha encontrado la id en el programa, buscando otra vez");
			this.id = this.navParams.get('id');
		}
		this.globalservices.download("https://aefenixbackend.000webhostapp.com/MySqlPHP/retrieve-personal-schedule.php?id=" + this.id)
		.map((response:Response) => response.json())
		.subscribe((data) => {
			if (data !== undefined) {
				this.checkData(data);
			}
			loading.dismiss();
		}, (err) => {
			console.log("Error al descargar los datos -> " + err);
			loading.dismiss();
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
				let newObjectData = {
					id_p: data[i].id_p,
					date: data[i].date,
					hour: data[i].hour,
					n_pract: data[i].n_pract-(data[i].n_pract-(i+1))
				}
				newData.push(newObjectData);
				counter--;
			} else {
				this.deleteSchedule(data[i]);
				this.n_pract--;
			}
		}
		this.data = newData;
	}
	goBack() {
		this.nav.pop();
	}
}
