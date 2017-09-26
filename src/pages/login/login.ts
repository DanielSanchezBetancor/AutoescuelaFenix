import { Component } from '@angular/core';
import { NavController, App, LoadingController } from 'ionic-angular';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalServices } from '../services/global.services';
import { TabsPage } from '../tabs/tabs';
@Component({
selector: 'login-page',
templateUrl: 'login.html'
})
export class LoginPage {
user: any;
pass: any;
data: any;
constructor(private nav: NavController, private globalservices: GlobalServices, private app: App, private loadingCtrl: LoadingController) {
	this.user = "";
	this.pass = "";
	this.data = "";
}
	login() {
		let loading = this.loadingCtrl.create({
			content: 'Espera por favor...'
		});
		loading.present();
		var err:boolean = true;
		this.user = this.user.trim().toLowerCase();
		this.pass = this.pass.trim().toLowerCase();
		if (this.user == "") {
			this.globalservices.activeToast("No puedes dejar el usuario en blanco");
		} else if (this.pass == "") {
			this.globalservices.activeToast("No puedes dejar la contraseña en blanco");
		} else {
			this.globalservices.download("https://aefenixbackend.000webhostapp.com/MySqlPHP/retrieve-data.php")
			.map((response: Response) => response.json())
			.subscribe((data) => {
				for (var i = 0;i<data.length;i++) {
					if (this.user == data[i].user.trim().toLowerCase()) {
						if (this.pass == data[i].pass.trim().toLowerCase()) {
							err = false;
							if (data[i].role == "user")
								this.globalservices.loginUser(this.user, data[i].id_u, data[i].n_pract);
							else
								this.globalservices.loginAdmin(this.user, 1);
						}
					}
				}	
				if (err) {
					this.globalservices.activeToast("Usuario o contraseña incorrectos");
				} else {
					this.globalservices.activeToast("Has iniciado sesion correctamente");
					this.nav.pop();
				}
			}, (error) => {
				loading.dismiss();
				this.globalservices.activeToast("Ha ocurrido un error. Inténtalo de nuevo.");
				console.log("Error al descargar la información: " + error);
			}, () => {
				loading.dismiss();
			});
		}
	}
getData() {

}
checkPass() {

}
}
