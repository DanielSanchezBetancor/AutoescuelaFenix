import { Component, ViewChild } from '@angular/core';
import { NavParams, Tabs, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MapPage } from '../map/map';
declare var cordova:any;
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
	tabhome = HomePage;
	tabmap = MapPage;
	@ViewChild("menutabs") menutabs: Tabs;
	constructor(public params: NavParams, platform: Platform) {
	}
}
