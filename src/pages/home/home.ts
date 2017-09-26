import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { App, NavController, NavParams } from 'ionic-angular';
import { GlobalServices } from '../services/global.services';
import { InfoPage } from '../info/info';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { SchedulePage } from '../schedule/schedule';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	role: any;
	name: any;
	refresh:boolean = false;
	greetings: any;
	constructor(public app: App, public globalservices: GlobalServices, private nav: NavController, private storage: Storage, private navParams: NavParams) {
		let role = {
			admin: false,
			user: false,
			guest: true
		};
		this.role = role;
		this.checkRole();
		this.checkName();
		this.getDate();
	}
	changeState(state) {
		console.log("(HomePage)changeState -> " + state);
		if (state == 0) 
			this.app.getRootNav().getActiveChildNav().select(0);
		else if (state == 1)
			this.app.getRootNav().getActiveChildNav().select(1);
		else if (state == 2)
			this.nav.push(InfoPage);
		else if (state == 3) 
			this.nav.push(LoginPage);
		else if (state == 4) 
			this.nav.push(RegisterPage);
		else if (state == 5)
			this.nav.push(SchedulePage);
	}
	ctrlPopover(ev) {
		this.globalservices.startPopover(ev);
	}
    logout() {		
		console.log("(HomePage)logout");
		this.globalservices.loginGuest();
		this.checkRole();
	}
	checkRole() {
		console.log("(HomePage)checkRole");
		this.storage.get('role').then((role) => {
			this.role = role;
		}, (err) => {
			console.log("Error comprobando el rol: " + err);
			this.checkRole();
		});
	}
	checkName() {
		this.storage.get('name').then((name) => {
			this.name = name;
		}, (err) => {
			console.log("Error comprobando el nombre: " + err);
			this.checkName();
		});
	}
	getDate() {
		var date = new Date().toISOString();
		var hour = parseInt(date.slice(11, 13));
		if (hour <= 12)
			this.greetings = "Buenos dias ";
		else if (hour > 12 && hour <= 20) 
			this.greetings = "Buenas tardes ";
		else
			this.greetings = "Buenas noches ";
	}
	ionViewWillEnter() {
		console.log("(HomePage)ionViewWillEnter");
		this.checkRole();
		this.checkName();
	}
}