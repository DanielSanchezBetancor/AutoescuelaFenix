import { Component, Inject, forwardRef } from '@angular/core';
import { ActionSheetController, ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { GlobalServices } from '../services/global.services';


@Component({
	selector: 'popover-page',
	template: 
	'<ion-list> '
	+ '<button ion-item (click)="asShare($event)">' 
	+ 'Comparte esta app' 
	+  '</button>'
	+ '</ion-list>'
})
export class PopOver {
	
	constructor(public actionSheetCtrl: ActionSheetController, @Inject(forwardRef(() => GlobalServices)) public globalservices: GlobalServices, private socialSharing: SocialSharing, public toast: ToastController) {
}
	asShare(ev) {
		this.globalservices.closePopover();
		let actionSheet = this.actionSheetCtrl.create({
      title: 'Elige la vía',
	  enableBackdropDismiss: true,
      buttons: [
        {
          text: 'WhatsApp',
		  icon: 'logo-whatsapp',
          role: 'destructive',
		  cssClass: 'buttonWaShare',
          handler: () => {
            this.socialSharing.shareViaWhatsApp("Mensaje predefinido", 'www/assets/images/logo_fenix.png', "http://www.linkdelmaket.com").then(
		   ()=>{
			   console.log("Publicado correctamente");
				this.activeToast("Whatsapp", true);
			}).catch((err) => {
				console.log("Fallo el promise: " + err);
				this.activeToast("Whatsapp", false);
			});
          }
        },{
          text: 'Facebook',
		  icon: 'logo-facebook',
          role: 'destructive',
		  cssClass: 'buttonFbShare',
          handler: () => {
           this.socialSharing.shareViaFacebookWithPasteMessageHint("Mensaje predefinido", 'www/assets/images/logo_fenix.png', "http://www.linkdelmaket.com").then(
		   ()=>{
			   console.log("Publicado correctamente");
				this.activeToast("Facebook", true);
			}).catch((err) => {
				console.log("Fallo el promise: " + err);
				this.activeToast("Facebook", false);
			});
          }
        },{
          text: 'Twitter',
		  icon: 'logo-twitter',
          role: 'destructive',
		  cssClass: 'buttonTwShare',
          handler: () => {
           this.socialSharing.shareViaTwitter("Mensaje predefinido. ", "www/assets/images/logo_fenix.png", "http://www.linkdelmarket.com").then(
		   ()=>{
			   console.log("Publicado correctamente");
				this.activeToast("Twitter", true);
			}).catch((err) => {
				console.log("Fallo el promise: " + err);
				this.activeToast("Twitter", false);
			});
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
  activeToast(via:String, success:boolean) {
	  var mess;
	  if (via == "Facebook") {
		  if (success) {
			  mess = 'Publicado correctamente';
		  } else {
			mess = 'Fallo al publicar';
		  }	
	  } else if (via == "Twitter") {
		  if (success) {
			  mess = 'Twitteado correctamente';
		  } else {
			  mess = 'Fallo al twittear';
		  }
	  }else if (via == "Whatsapp") {
		  if (success) {
			  mess = 'Mensaje enviado correctamente';
		  } else {
			  mess = 'Fallo al enviar el mensaje';
		  }
	  }
		let toast = this.toast.create({
			message: mess,
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
  }
}