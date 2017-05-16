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
	  loginUser(name, id) {
		  let role = {
			  admin: false,
			  user: true,
			  guest: false
		  };
		  this.saveRole(role, name, id);
	  }
	  loginAdmin(name, id) {
		 let role = {
			  admin: true,
			  user: false,
			  guest: false
		  };
		this.saveRole(role, name, id);
	  }
	loginGuest() {
		let role = {
			admin: false,
			user: false,
			guest: true
		};
		this.saveRole(role, "invitado", 0);
	}
	saveRole(role, name, id) {
		this.storage.set('role', role);
		this.storage.set('name', name);
		this.storage.set('id', id);
		console.log("\nGuardado el rol.nombre: " + name + "\nGuardado el rol.id: " + id);
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
	cleanNav(nav) {
		console.log("Length: " + nav.length());
		return nav.remove(0, nav.length()-1);
	}
	refreshPage(nav, page) {
		console.log("Length: " + nav.length());
		this.cleanNav(nav).then(() => {
			nav.push(page);
			console.log("Length: " + nav.length());
		}, (err) => {
			console.log("Error: " + err);
		});
	}
	getRole() {
		console.log("GetRole");
		return this.storage.get('role');
	}
	
}
