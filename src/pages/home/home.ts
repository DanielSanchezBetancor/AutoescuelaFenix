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
	constructor(public app: App, public globalservices: GlobalServices, private nav: NavController, private storage: Storage, private navParams: NavParams) {
		let role = {
			admin: false,
			user: false,
			guest: true
		};
		this.role = role;
		this.checkRole();
		this.checkName();
	}
	changeState(state) {
		if (state == 1)
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
		this.globalservices.loginGuest();
		this.globalservices.refreshPage(this.nav, HomePage);
	}
	getRole() {
		return this.storage.get('role');
	}
	getName() {
		return this.storage.get('name');
	}
	checkRole() {
		this.getRole().then((role) => {
		  this.role = role;
		    if (this.role.guest == false && this.refresh == true) {
				this.globalservices.refreshPage(this.nav, HomePage);
			}
	  }, (err) => {
		  console.log("Error comprobando el rol: " + err);
		  this.checkRole();
	  });
	}
	checkName() {
		this.getName().then((name) => {
		  this.name = name;
	  }, (err) => {
		  console.log("Error comprobando el nombre: " + err);
		  this.checkRole();
	  });
	}
}