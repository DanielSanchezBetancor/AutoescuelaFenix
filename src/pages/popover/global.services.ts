import { Injectable } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { PopOver } from '../popover/popover';
import { Storage } from '@ionic/storage';

@Injectable()
export class GlobalServices {
	popover: any;
	role: {
			  admin: false,
			  user: false,
			  guest: true
		  };
	constructor(public popoverCtrl: PopoverController, private storage: Storage) {
		this.storage.length().then((val)=> { if (val == 0) this.loginGuest();});
	}
	
	 startPopover(ev) {
		this.popover = this.popoverCtrl.create(PopOver);
		this.popover.present({ev: ev});
  }
	  closePopover() {
		  this.popover.dismiss();
	  }
	  loginUser() {
		  let role = {
			  admin: false,
			  user: true,
			  guest: false
		  };
		  this.saveRole(role);
	  }
	  loginAdmin() {
		 let role = {
			  admin: true,
			  user: false,
			  guest: false
		  };
		this.saveRole(role);
	  }
	   loginGuest() {
		 let role = {
			  admin: false,
			  user: false,
			  guest: true
		  };
		this.saveRole(role);
	  }
	  saveRole(role) {
		  this.storage.set('role', role);
		  console.log("Guardado el rol: " + role);
	  }
}
