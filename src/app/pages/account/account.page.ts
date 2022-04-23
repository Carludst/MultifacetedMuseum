import { Component, OnInit } from '@angular/core';
import {ActionSheetController, AlertController, NavController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../services/language.services';



@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user: any;
  languages = [];
  selected = '';

  constructor(private navController: NavController,
              private afs: AngularFirestore,
              private userService: UsersService,
              private alertController: AlertController,
              private usersService: UsersService,
              private router: Router,
              public actionSheetController: ActionSheetController,
              private translateService: TranslateService,
              private languageService: LanguageService) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  onSettings() {
    this.navController.navigateRoot('settings');
  }

  toPreferences(){
    this.navController.navigateRoot('preferences');
  }

  toTickets(){
    this.navController.navigateRoot('tickets');
  }

  signOut(){
    this.usersService.signOut().then(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    });
  }

  async presentActionSheetChangeCred() {

    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('CambioCredenziali.title'),
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: this.translateService.instant('CambioCredenziali.Password'),
          icon: 'pencil',
          role: 'destructive',
          handler: () => {
            this.router.navigateByUrl('/change-profile/reauth', { replaceUrl: true });
          }
        },
        {
          text: this.translateService.instant('CambioCredenziali.Email'),
          icon: 'pencil',
          handler: () => {
            this.router.navigateByUrl('/change-profile/change_email', { replaceUrl: true });
          }
        },
        {
          text: this.translateService.instant('CambioCredenziali.User'),
          icon: 'pencil',
          handler: () => {
            this.router.navigateByUrl('/change-profile/change_username', { replaceUrl: true });
          }
        }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('Settings.Lingua'),
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Italiano',
        role: 'destructive',
        icon: 'flag',
        handler: () => {
          this.select('it');
        }
      }, {
        text: 'English',
        icon: 'flag',
        handler: () => {
          this.select('en');
        }
      }]
    });
    await actionSheet.present();
  }

  select(lng){
    this.languageService.setLanguage(lng);
  }
}
