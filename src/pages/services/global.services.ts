import { Injectable } from '@angular/core';
import { PopoverController, Platform, ToastController } from 'ionic-angular';
import { PopOver } from '../popover/popover';
import { Http } from '@angular/http';
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
	  loginUser(name, id, n_pract) {
		  let role = {
			  admin: false,
			  user: true,
			  guest: false
		  };
		  this.saveRole(role, name, id, n_pract);
	  }
	  loginAdmin(name, id) {
		 let role = {
			  admin: true,
			  user: false,
			  guest: false
		  };
		this.saveRole(role, name, id, 0);
	  }
	loginGuest() {
		let role = {
			admin: false,
			user: false,
			guest: true
		};
		this.saveRole(role, "invitado", 0, 0);
	}
	saveRole(role, name, id, n_pract) {
		this.storage.set('role', role);
		this.storage.set('name', name);
		this.storage.set('id', id);
		this.storage.set('n_pract', n_pract);
		
			console.log(this.storage.get('n_pract'));
			console.log(this.storage.get('id'));
			console.log(n_pract);
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
	getRole() {
		return this.storage.get('role');
	}
	
}
