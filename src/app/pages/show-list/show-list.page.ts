import { Component, OnInit } from '@angular/core';
import { ShowListService } from '../../services/show-list.service';
import { ConnectivityService} from '../../services/connectivity.service';
import {LoadingController, NavController} from '@ionic/angular';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';
import{ ActionSheetController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from 'src/app/services/language.services';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.page.html',
  styleUrls: ['./show-list.page.scss'],
})
export class ShowListPage implements OnInit {

  showList: any;
  languages = [];
  selected = '';

  constructor(private showListServices: ShowListService,
              private connectivityService: ConnectivityService,
              private navCotroller: NavController,
              private usersService: UsersService,
              private router: Router,
              public actionSheetController: ActionSheetController,
              private translateService: TranslateService,
              private languageService: LanguageService){}

  ngOnInit() {

    this.connectivityService.appIsOnline$.subscribe(online => {

      if (online){
        this.showListServices.shows$.subscribe(show => {
          this.showList = show;
          var storableShowList = [];
          for (const showData of this.showList) {
            storableShowList.push(showData);
          }
          this.showListServices.storeShowListData(storableShowList);
        });
      } else {
        if (this.showListServices.dataExist()){
          this.showListServices.getShowDataFromStorage().then(result => {
            console.log(result);
            this.showList = result;
          });
        }
      }
    });

    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;

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
