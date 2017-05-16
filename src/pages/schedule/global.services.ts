import { Injectable } from '@angular/core';
import { PopoverController, Platform, ToastController } from 'ionic-angular';
import { PopOver } from '../popover/popover';
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class GlobalServices {
	popover: any;
	role: {
			  admin: false,
			  user: false,
			  guest: true
	};
	constructor(private toast: ToastController, public popoverCtrl: PopoverController, private storage: Storage,private platform: Platform, private http: Http) {
		platform.ready().then(() => {
			this.storage.length()
			.then((val)=> { 
				if (val == 0) 
					this.loginGuest();
			});
		});
	}		
	startPopover(ev) {
		this.popover = this.popoverCtrl.create(PopOver);
		this.popover.present({ev: ev});
	}
	closePopover() {
		this.popover.dismiss();
	}
	loginUser(name) {
		let role = {
			admin: false,
			user: true,
			guest: false
		};
		this.saveRole(role, name);
	}
	loginAdmin(name) {
		let role = {
			admin: true,
			user: false,
			guest: false
		};
		this.saveRole(role, name);
	}
	loginGuest() {
		let role = {
			admin: false,
			user: false,
			  guest: true
		  };
		this.saveRole(role, "invitado");
	  }
	  saveRole(role, name) {
		  this.storage.set('role', role);
		  this.storage.set('name', name);
		  console.log("GlobalServices => Guardado el rol: " + name);
	  }
	download(url) {
		return this.http.get(url);
	}
	activeToast(mess) {
		let toast = this.toast.create({
			message: mess,
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}

}
