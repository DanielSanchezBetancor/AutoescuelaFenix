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
	id: any;
	n_pract: any;
	refresh:boolean = false;
	greetings: any;
	constructor(public app: App, public globalservices: GlobalServices, private nav: NavController, private storage: Storage, private navParams: NavParams) {
		this.checkIfLogged();
		this.checkRole();
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
		location.reload();
	}
	checkRole() {
		this.storage.get('role').then((role) => {
			this.role = role;
			if (role.admin !== undefined && role.admin == true) {
				this.globalservices.loginAdmin(this.name, this.id);
			} else if (role.user !== undefined && role.user == true) {
				this.globalservices.loginUser(this.name, this.id, this.n_pract);
			} else if (role.guest  !== undefined && role.guest == true) {
				this.globalservices.loginGuest();
			}
		}, (err) => {
			console.log("Error comprobando el rol: " + err);
			this.checkRole();
		});
	}
	checkIfLogged() {
		console.log("(HomePage)checkIfLogged");
		this.storage.get('name').then((name) => {
			this.name = name;
		}, (err) => {
			console.log("Error comprobando el nombre: " + err);
			this.checkIfLogged();
		});
		this.storage.get('id').then((id) => {
			this.id = id;
		}, (err) => {
			console.log("Error comprobando el id: " + err);
			this.checkIfLogged();
		});
		this.storage.get('n_pract').then((n_pract) => { this.n_pract = n_pract });
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
		this.checkIfLogged();
	}
}