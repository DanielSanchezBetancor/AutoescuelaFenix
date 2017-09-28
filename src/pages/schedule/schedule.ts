import { Component } from '@angular/core';
import { AlertController, Platform, LoadingController, NavController } from 'ionic-angular';
import { GlobalServices } from '../services/global.services';
import { Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { MyPersonalSchedulePage } from '../my-personal-schedule-page/my-personal-schedule-page';

@Component({
  selector: 'page-schedule',
  template:
  "<ion-content padding>" + 
  "Horario" + 
  "<div *ngIf='data'>" + 
  "<ul *ngFor='let dt of dates'>" + 
  "{{dt.date | date: 'dd-MM-yyyy'}}" + 
  "<li> 16:00 <label *ngIf='dt.firsth'>Ocupado</label><label *ngIf='!dt.firsth'>Libre</label></li>" + 
  "<li> 16:45 <label *ngIf='dt.secondh'>Ocupado</label><label *ngIf='!dt.secondh'>Libre</label></li>" + 
  "<li> 17:30 <label *ngIf='dt.thirdh'>Ocupado</label><label *ngIf='!dt.thirdh'>Libre</label></li>" + 
  "<li> 18:15 <label *ngIf='dt.fourh'>Ocupado</label><label *ngIf='!dt.fourh'>Libre</label></li>" + 
  "</ul>" +
  "</div>" + 
  "<button ion-button (click)='showConfirmDialog()'>Añadir nueva práctica</button>" + 
  "<button ion-button (click)='showPersonalSchedule()'>Ver mis prácticas</button>"
  + "<button ion-button (click)='goBack()'>Volver atrás</button>"
  + "</ion-content>"
})
export class SchedulePage {
	data: any;
	hours: any;
	choose: any;
	name: any;
	id: any;
	dates: any;
	n_pract: any;
	constructor(private nav: NavController, private storage: Storage, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private globalservices: GlobalServices, private platform: Platform) {
		this.hours = ["16:00:00", "16:45:00", "17:30:00", "18:15:00"];
		platform.ready().then(() => {
			let loading = this.loadingCtrl.create({
				content: 'Espera por favor...'
			});
			loading.present();
			this.globalservices.download("https://aefenixbackend.000webhostapp.com/MySqlPHP/retrieve-schedule.php")
			.map((response:Response) => response.json())
			.subscribe((data) => {
				this.data = data;
				this.dates = [];
				this.createDates();
				loading.dismiss();
			}, (err) => { 
				console.log("Error al descargar el archivo 'retrieve-schedule': " + err); 
				loading.dismiss();
			});
			this.storage.get('name').then((name) => {
				this.name = name;
			});
			this.storage.get('id').then((id) => {
				this.id = id;
			});
			this.storage.get('n_pract').then((n_pract) => {
				this.n_pract = n_pract;
			});
		});
		
	}
	createDates() {
		let today = new Date();
		for (var i = 0;i<5;i++) {
			var DT = {
				date: null,
				firsth: null,
				secondh: null,
				thirdh: null,
				fourh: null
			};
			var formatToday = today.toISOString();
			DT.date = formatToday.slice(0, 10);
			DT.firsth = this.calculateHour(DT.date, "16:00:00");
			DT.secondh = this.calculateHour(DT.date, "16:45:00");
			DT.thirdh = this.calculateHour(DT.date, "17:30:00");
			DT.fourh = this.calculateHour(DT.date, "18:15:00");
			this.dates[i] = DT;
			today.setDate(today.getDate() + 1);
			if (today.getDay() == 0 || today.getDay() == 1) {
				i--;
			}
		}
	}
	//Devuelve true si la hora, en la fecha, esta ocupada por alguien
	calculateHour(date, hour) {
		var returnData = false;
		for (var i = 0;i<this.data.length;i++) {
			if (date == this.data[i].date) {
				if (hour == this.data[i].hour) {
					returnData = true;
				}
			}
		}
		return returnData;
	}
	showConfirmDialog() {
		let alert = this.alertCtrl.create();
		alert.setTitle("Horario de prácticas");
		alert.setMessage("Escoge una fecha para ver los horarios disponibles");
		for (var i = 0;i<this.dates.length;i++) {
			alert.addInput({
				type: 'radio',
				label: this.dates[i].date,
				value: this.dates[i].date,
				checked: false
			});
		};
		alert.addButton('Cancelar');
		alert.addButton({
			text: 'Elegir',
			handler: choose => {
				this.showNextDialog(choose);
			}
    });
		alert.present();
	}
	
	showNextDialog(choose) {
		let alert = this.alertCtrl.create();
		for (var i = 0;i<4;i++) {
			if (!this.calculateHour(choose, this.hours[i]))
				alert.addInput({
					type: 'radio',
					label: this.hours[i],
					value: this.hours[i],
					checked: false
				});
		}
		alert.addButton('Cancelar');
		alert.addButton({
			text: 'OK',
			handler: hour => {
				this.uploadHour(choose, hour.slice(0, hour.length - 3));
      }	
    });
		alert.present();
	}
	uploadHour(choose, hour) {
		let loading = this.loadingCtrl.create({
			content: "Asignado la practica seleccionada..."
		});
		loading.present();
		this.n_pract++;
		this.globalservices.download("https://aefenixbackend.000webhostapp.com/MySqlPHP/manage-schedule.php?date=" + choose + "&hour=" + hour + "&id_usuario=" + this.id + "&n_pract=" + (this.n_pract))
		.map((response:Response) => response.json())
		.subscribe((message) => {
			this.storage.set("n_pract", this.n_pract);
			this.nav.pop();
			this.nav.push(SchedulePage);
			loading.dismiss();
		}, (err) => {
			console.log(err);
			this.n_pract--;
			loading.dismiss();
		});
	}
	showPersonalSchedule() {
		this.nav.push(MyPersonalSchedulePage, { id: this.id});
	}
	goBack() {
		this.nav.pop();
	}
}
