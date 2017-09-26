import { Component, ViewChild } from '@angular/core';
import { GlobalServices } from '../services/global.services';
import { NavController, Content } from 'ionic-angular';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
	hide: any;
	swap: any;
	@ViewChild(Content) content: Content;
	constructor(private globalservices: GlobalServices, private navcontroller: NavController) {
		this.hide = true;
		this.swap = false;
	}
	ensenarOfertas() {
		this.hide = this.swap;
		if (this.swap == true) 
			this.swap = false;
		else 
			this.swap = true;
		console.log(this.hide);
		this.content.scrollToTop();
	}
}