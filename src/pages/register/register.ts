import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../home/home';
import { GlobalServices } from '../services/global.services';
import { Response } from '@angular/http';

@Component({
	selector: 'register-page',
	templateUrl: 'register.html'
})
export class RegisterPage {
	confirmed: any;
	pass: any;
	user: any;
	constructor(private alertCtrl: AlertController, private navC: NavController, private natstorage: NativeStorage, private globalservices: GlobalServices, private loadingCtrl: LoadingController) {
		this.pass = "";
		this.user = "";
		this.confirmed = false;
	}
	register() {
		let loading = this.loadingCtrl.create({
			content: 'Espera por favor...'
		});
		loading.present();
		if (this.confirmed) {
			if (this.user == "") {
				this.globalservices.activeToast("No puedes dejar el usuario en blanco");
			} else if (this.pass == "") {
				this.globalservices.activeToast("No puedes dejar la contraseña en blanco");
			} else {
				this.globalservices.download("https://aefenixbackend.000webhostapp.com/MySqlPHP/manage-data.php?name=" + this.user + "&pass=" + this.pass + "&role=user")
				.map((response:Response) => response.json())
				.subscribe((message) => {
					console.log(message);
					this.globalservices.activeToast("Introducido el usuario con exito");
				}, (err) => {
					console.log(err);
					this.globalservices.activeToast("Error al introducir el usuario");
				});
			}
		}
		loading.dismiss();
	}
	showConfirmDialog() {
		let alert = this.alertCtrl.create({
			title: "Confirmar usuario",
			message: "¿Quiéres introducir el usuario <br/>" + this.user + "<br/> Y contraseña <br/>" + this.pass + " <br/> Al programa?",
			buttons: [
			{
				text: "Aceptar",
				handler: () => { this.confirmed = true; this.register(); this.navC.push(HomePage); }
			}, {
				text: "Cancelar",
				handler: () => { this.confirmed = false; }
			}]
		});
		alert.present();
	}
	goBack() {
		this.navC.popToRoot();
	}
}