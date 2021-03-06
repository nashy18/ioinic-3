import { Component, ViewChild } from '@angular/core';
import { Platform, Events, ToastController, Nav, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SignInPage } from '../pages/sign-in/sign-in';
import { AboutUsPage } from '../pages/about-us/about-us';
import { SignOutPage } from '../pages/sign-out/sign-out';
import { AuthenticationPage } from '../pages/authentication/authentication';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = AuthenticationPage;
  activePage: any;

  pages: Array<{title: String, component: any}>;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public events: Events, public toastController: ToastController, public modalCtrl : ModalController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    events.subscribe('toastr', (msg) => {
      this.presentToast(msg);
    });

    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'Sign In', component: SignInPage},
      {title: 'About Us', component: AboutUsPage},
      {title: 'Sign Out', component: SignOutPage},
      {title: 'Admin Sign Out', component: MyApp}
    ];

    this.activePage = this.pages[0];
  }

  openPage(page) {

    if(page.title == 'Admin Sign Out') {

        console.log("admin signout");
        var data = { header: 'Confirmation', body : 'Are you Admin? Please enter your email id: ', type: 'adminLogOut' };
        var modalPage = this.modalCtrl.create('ConfirmationModalPage', data); 
        modalPage.present();

        modalPage.onDidDismiss((obj) => {

          if((obj) && obj.status == 'confirmed') {
            this.nav.setRoot(AuthenticationPage);
          }
          
          console.log("Admin Email validation modal closed");
        });

        modalPage.onWillDismiss(() => {
      
          console.log("Admin Email validation modal is about to close");
        });
    } else {

      this.nav.setRoot(page.component);
      this.activePage = page;
    }
  }

  checkActivePage(page) {
    return page === this.activePage;
  }

  presentToast(msg) {
    let toast = this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}

