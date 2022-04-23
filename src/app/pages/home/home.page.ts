import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../services/news.service';
import {LoadingController, NavController} from '@ionic/angular';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';
import{ ActionSheetController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from 'src/app/services/language.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  newses: any;
  languages = [];
  selected = '';

  constructor(private newsService: NewsService,
              private navCotroller: NavController,
              private usersService: UsersService,
              private router: Router,
              public actionSheetController: ActionSheetController,
              private translateService: TranslateService,
              private languageService: LanguageService) { }

  ngOnInit() {
    this.newsService.newses$.subscribe(news => {
      this.newses = news;
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
