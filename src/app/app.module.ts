import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { InfoPage } from '../pages/info/info';
import { PopOver } from '../pages/popover/popover';
import { MapPage }  from '../pages/map/map';
import { GlobalServices }  from '../pages/services/global.services';
import { LoginPage }  from '../pages/login/login';
import { RegisterPage }  from '../pages/register/register';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { SchedulePage } from '../pages/schedule/schedule';
import { MyPersonalSchedulePage } from '../pages/my-personal-schedule-page/my-personal-schedule-page';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
	TabsPage,
	MapPage,
	InfoPage,
	PopOver,
	LoginPage,
	RegisterPage,
	SchedulePage, 
	MyPersonalSchedulePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
	IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	TabsPage,
	MapPage,
	InfoPage,
	PopOver,
	LoginPage,
	SchedulePage,
	RegisterPage,
	MyPersonalSchedulePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	GlobalServices,
	SocialSharing,
	NativeStorage,
	Transfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
